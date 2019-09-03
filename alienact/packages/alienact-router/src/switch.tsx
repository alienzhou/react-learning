// cSpell: ignore alienact
import React from 'alienact';
import {RouterContext} from './context';
import {ContextValue} from './types';
import {matchPathPattern} from './utils';

class Switch extends React.Component {
    render() {
        return (
            <RouterContext.Consumer>
                {(value: ContextValue): any => {
                    if (!this.props.children) {
                        return null;
                    }

                    let element = null;
                    for (let i = 0; i < this.props.children.length; i++) {
                        const child = this.props.children[i];
                        const pattern = child.props.path;
                        if (matchPathPattern(value.history.location.pathname, pattern)) {
                            element = child;
                            break;
                        }
                    }

                    return element;
                }}
            </RouterContext.Consumer>
        )
    }
}

export default Switch;