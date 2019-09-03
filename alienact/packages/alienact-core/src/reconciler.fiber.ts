import {
    DOM,
    Fiber,
    FiberTag,
    FiberTask,
    AlienElement,
    IdleDeadline,
    FunctionComp,
    ComponentCtor,
    FiberEffectTag,
    TaskCallbackFunction
} from './types';
import {
    isClassByType,
    isFuncByType,
    requestTaskCallback
} from './utils';
import {retrieveRender} from './inject';
import Component from './component';

const render = retrieveRender();

// use the react variable name directly
const timeHeuristicForUnitOfWork = 1;
const updateQueue: FiberTask[] = [];
let nextUnitOfWork: Fiber = null;
let pendingCommit: Fiber = null;

type FiberDom = Omit<Fiber, 'stateNode'> & {stateNode: DOM};

// rest something for windup
const windup = (): void => {
    (pendingCommit.stateNode as DOM).__rootContainerFiber = pendingCommit;
    nextUnitOfWork = null;
    pendingCommit = null;
}

// find the closet ancestor dom
const findClosetDomAncestor = (fiber: Fiber): FiberDom => {
    fiber = fiber.return;
    // only host or root is a dom
    while (
        fiber.tag !== FiberTag.HOST_COMPONENT
        && fiber.tag !== FiberTag.HOST_ROOT
    ) {
        fiber = fiber.return;
    }
    return fiber as FiberDom;
}

const deleteAllDoms = (root: Fiber, parent: DOM): void => {
    let node: Fiber = root;
    while (true) {

        // lifecycle: componentWillUnmount
        if (
            node.tag === FiberTag.CLASS_COMPONENT
            && (node.stateNode as Component).componentWillUnmount
        ) {
            (node.stateNode as Component).componentWillUnmount();
        }

        if (node.tag !== FiberTag.HOST_COMPONENT) {
            node = node.child;
            continue;
        }

        parent.removeChild((node.stateNode as DOM));
        while (node !== root && !node.sibling) {
            node = node.return;
        }
        if (node === root) {
            return;
        }
        node = node.sibling;
    }
}

const commitWork = (effected: Fiber): void => {
    const isClassComp = isClassByType(effected.type);
    const publicInstance = isClassComp
        ? effected.stateNode as Component
        : null;

    // lifecycle: getSnapshotBeforeUpdate
    let snapshot = null;
    if (
        publicInstance
        && publicInstance.getSnapshotBeforeUpdate
        // no alternate means initial instantiating
        && effected.alternate
    ) {
        snapshot = publicInstance.getSnapshotBeforeUpdate(
            effected.props,
            publicInstance.prevState || publicInstance.state
        );
        if (snapshot === undefined) {
            snapshot = null;
        }
    }

    if (effected.tag === FiberTag.HOST_ROOT) {
        return;
    }

    if (effected.effectTag === FiberEffectTag.DELETION) {
        let fiber = findClosetDomAncestor(effected);
        deleteAllDoms(effected, fiber.stateNode);
    }
    else if (
        effected.effectTag === FiberEffectTag.UPDATE
        && effected.tag === FiberTag.HOST_COMPONENT
    ) {
        render.updateNativeProperties(
            effected.stateNode,
            effected.alternate.props,
            effected.props,
            effected.type
        );
    }
    else if (
        effected.effectTag === FiberEffectTag.PLACEMENT
        && effected.tag === FiberTag.HOST_COMPONENT
    ) {
        let fiber = findClosetDomAncestor(effected);
        fiber.stateNode.appendChild((effected.stateNode as DOM));
    }

    // lifecycle: componentDidUpdate
    if (
        publicInstance
        && publicInstance.componentDidUpdate
        // no alternate means initial instantiating
        && effected.alternate
    ) {
        publicInstance.componentDidUpdate(
            effected.alternate.props,
            publicInstance.prevState || publicInstance.state,
            snapshot
        );
    }
}

const commitAllWork = (pending: Fiber): void => {
    // now all effects (updates) are on root fiber node and pendingCommit is the root one
    // the first item is the very left leaf
    pending.effects.forEach(
        // committing will start update read doms on screen
        // so you can not pause them for consistent visualization
        commitWork
    );

    windup();
}

const completeWork = (fiber: Fiber): void => {
    // link the new fiber to publicInstance
    if (fiber.tag === FiberTag.CLASS_COMPONENT) {
        (fiber.stateNode as Component).__fiber = fiber;
    }

    // the current fiber node and its subtree has reconciled
    // sync its updates to its parent fiber
    if (fiber.return) {
        // its children's updates
        const childEffects = fiber.effects || [];
        // its own updates
        const selfEffect = fiber.tag !== null && fiber.tag !== undefined ? [fiber] : [];
        // its parent's updates
        const parentEffects = fiber.return.effects || [];

        // here you can see: its a bottom-up array
        // the first item is the first tree node by DFS
        fiber.return.effects = parentEffects.concat(childEffects, selfEffect);
    }
    else {
        // meet root node (reconciling end), prepare to commit all updates to screen
        pendingCommit = fiber;
    }
}

const reconcileChildrenArray = (
    parent: Fiber,
    children: AlienElement | AlienElement[]
): void => {
    if (!Array.isArray(children)) {
        children = [children];
    }

    let formerFiber = parent.alternate ? parent.alternate.child : null;
    let newFiber: Fiber = null;
    // compare fiber list with children list
    for (let i = 0; i < children.length || formerFiber; i++) {

        const prevFiber = newFiber;
        const element: AlienElement = i < children.length ? children[i] : null;
        const onlyUpdate = element && formerFiber && element.type === formerFiber.type;

        // same type, just update
        if (onlyUpdate) {
            newFiber = {
                type: formerFiber.type,
                tag: formerFiber.tag,
                props: element.props,
                return: parent,
                stateNode: formerFiber.stateNode,
                alternate: formerFiber,
                partialState: formerFiber.partialState,
                effectTag: FiberEffectTag.UPDATE
            };
        }

        // different type, former node should be deleted (if it exists)
        if (formerFiber && !onlyUpdate) {
            formerFiber.effectTag = FiberEffectTag.DELETION;
            // record fiber to be deleted
            if (!parent.effects) {
                parent.effects = [formerFiber];
            }
            else {
                parent.effects.push(formerFiber);
            }
            newFiber = null;
        }

        if (element && !onlyUpdate) {
            let tag: FiberTag;
            if (isClassByType(element.type)) {
                tag = FiberTag.CLASS_COMPONENT;
            }
            else if (isFuncByType(element.type)) {
                tag = FiberTag.FUNCTION_COMPONENT;
            }
            else {
                tag = FiberTag.HOST_COMPONENT;
            }

            newFiber = {
                type: element.type,
                tag: tag,
                props: element.props,
                return: parent,
                effectTag: FiberEffectTag.PLACEMENT
            };
        }

        if (formerFiber) {
            formerFiber = formerFiber.sibling;
        }

        if (i === 0) {
            parent.child = newFiber;
        }
        else if (prevFiber && element) {
            prevFiber.sibling = newFiber;
        }
    }
}

const updateFunctionComponent = (fiber: Fiber): void => {
    const childElements = (fiber.type as FunctionComp)(fiber.props);
    reconcileChildrenArray(fiber, childElements);
}

const cloneChildrenFiber = (fiber: Fiber): void => {
    let formerFiber = fiber.alternate;
    if (!formerFiber.child) {
        return;
    }

    // link all children
    let currentFiber: Fiber = null;
    let formerChildFiber = formerFiber.child;
    while (formerChildFiber) {
        const newFiber: Fiber = {
            type: formerChildFiber.type,
            tag: formerChildFiber.tag,
            stateNode: formerChildFiber.stateNode,
            props: formerChildFiber.props,
            partialState: formerChildFiber.partialState,
            alternate: formerChildFiber,
            return: fiber
        }

        if (!currentFiber) {
            fiber.child = newFiber;
        }
        else {
            currentFiber.sibling = newFiber;
        }

        currentFiber = newFiber;
        formerChildFiber = formerChildFiber.sibling;
    }
}

const updateHostComponent = (fiber: Fiber): void => {
    if (!fiber.stateNode) {
        fiber.stateNode = render.createNativeElementNode(fiber);
    }

    // support ref
    if (fiber.props.ref) {
        fiber.props.ref.current = fiber.stateNode;
    }

    reconcileChildrenArray(fiber, fiber.props.children);
}

const updateClassComponent = (fiber: Fiber): void => {
    let isFirstRender = false;
    let publicInstance = fiber.stateNode as Component;
    if (!publicInstance) {
        const ctor = fiber.type as ComponentCtor;
        publicInstance = new ctor(fiber.props);
        publicInstance.__fiber = fiber;
        fiber.stateNode = publicInstance;
        isFirstRender = true;

        // support ref
        if (fiber.props.ref) {
            fiber.props.ref.current = publicInstance;
        }

        // lifecycle: componentDidMount
        if (publicInstance.componentDidMount) {
            publicInstance.componentDidMount();
        }
    }
    else if (fiber.props === publicInstance.props && !fiber.partialState) {
        cloneChildrenFiber(fiber);
        return;
    }

    // default to reconcile
    let needUpdate = true;
    const nextProps = fiber.props;
    const nextState = Object.assign({}, publicInstance.state, fiber.partialState);
    if (
        // render with initial instantiating won't be prevented
        !isFirstRender
        && publicInstance.shouldComponentUpdate
    ) {
        needUpdate = publicInstance.shouldComponentUpdate(nextProps, nextState);
    }

    publicInstance.props = fiber.props;
    publicInstance.state = Object.assign({}, publicInstance.state, fiber.partialState);

    fiber.partialState = null;

    if (needUpdate) {
        const childElements = publicInstance.render();
        reconcileChildrenArray(fiber, childElements);
    }
}

// it will construct current fiber's children
// or mark all completed fibers (no more children needed to be processed)
const beginWork = (fiber: Fiber): void => {
    if (fiber.tag === FiberTag.CLASS_COMPONENT) {
        updateClassComponent(fiber);
    }
    else if (fiber.tag === FiberTag.FUNCTION_COMPONENT) {
        updateFunctionComponent(fiber);
    }
    else {
        updateHostComponent(fiber);
    }
}

// process a unit of work (fiber) and return a fiber which is going to be process after
const performUnitWork = (unit: Fiber): Fiber => {
    beginWork(unit);
    // traverse first child
    if (unit.child) {
        return unit.child;
    }

    // then process its sibling
    while (unit) {
        // all its subtree has been reconciled
        completeWork(unit);
        if (unit.sibling) {
            return unit.sibling;
        }
        unit = unit.return;
    }
    return null;
}

// find the root fiber node
const getRoot = (fiber: Fiber) => {
    while (fiber.return) {
        fiber = fiber.return;
    }
    return fiber;
}

const resetNextUnitOfWork = () => {
    const update = updateQueue.shift();
    // everything has been done
    if (!update) {
        return;
    }

    if (update.partialState) {
        update.instance.__fiber.partialState = update.partialState;
    }

    // find the root fiber as the start of reconciling work
    const root: Fiber = update.from === FiberTag.HOST_ROOT
        ? update.dom.__rootContainerFiber
        : getRoot(update.instance.__fiber);

    nextUnitOfWork = {
        tag: FiberTag.HOST_ROOT,
        alternate: root,
        stateNode: update.dom || root.stateNode,
        props: update.newProps || root.props
    };
}

const workLoop = (deadline: IdleDeadline): void => {

    if (!nextUnitOfWork) {
        resetNextUnitOfWork();
    }

    // loop and break only when
    // 1. there is no more work node
    // 2. exceed the deadline
    while (nextUnitOfWork && deadline.timeRemaining() > timeHeuristicForUnitOfWork) {
        nextUnitOfWork = performUnitWork(nextUnitOfWork);
    }
    // if everything done (set to pendingCommit), commit all updates
    if (pendingCommit) {
        commitAllWork(pendingCommit);
    }
}

// start work on fibers
const performWork: TaskCallbackFunction = (deadline: IdleDeadline): void => {
    workLoop(deadline);

    // perform when there is some work left
    if (nextUnitOfWork || updateQueue.length > 0) {
        requestTaskCallback(performWork);
    }
}

export function pushToUpdateQueue(task: FiberTask): void {
    updateQueue.push(task);
    requestTaskCallback(performWork);
}