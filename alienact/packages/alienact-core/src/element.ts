import {
    Node,
    Props,
    TEXT_NODE,
    AlienElement,
    ComponentType,
} from './types';
import {standardElement} from './utils';

function createElement(
    type: ComponentType,
    config: Props,
    ...args: Node[]
): AlienElement {
    const props = Object.assign({}, config);
    if (args.length > 0) {
        let children: Node[] = [];
        // 标准化 children
        args.forEach(child => {
            // 将数字类型标准化为 text
            if (
                typeof child === 'number'
                || typeof child === 'boolean'
                || typeof child === 'string'
            ) {
                children.push(standardElement(child));
            }

            // 标准化函数节点
            else if (typeof child === 'function') {
                const ele: AlienElement = {
                    type: child as any,
                    props: {}
                }
                children.push(ele);
            }

            // 数组扁平化
            else if (Array.isArray(child)) {
                children.push(...child);
            }

            else {
                children.push(child);
            }

        });

        props.children = children;
    }

    return {
        type,
        props
    };
}

export default createElement;