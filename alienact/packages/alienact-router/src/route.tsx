// cSpell: ignore alienact
import React from 'alienact';
import {RouterContext} from './context';
import {ContextValue} from './types';
import {matchPathPattern} from './utils';

class Route extends React.Component {
    render() {
        return (
            <RouterContext.Consumer>
                {(value: ContextValue): any => {
                    const {history, location} = value;
                    if (!matchPathPattern(location.pathname, history.base + this.props.path)) {
                        return '';
                    }
                    return React.createElement(this.props.component, value);
                }}
            </RouterContext.Consumer>
        )
    }
}

export default Route;