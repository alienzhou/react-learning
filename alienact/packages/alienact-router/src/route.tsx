// cSpell: ignore alienact
import React from 'alienact';
import {RouterContext} from './context';
import {IHistory} from './types';
import {matchPathPattern} from './utils';

class Route extends React.Component {
    render() {
        return (
            <RouterContext.Consumer>
                {(history: IHistory): any => {
                    const location = history.location;
                    if (!matchPathPattern(location.pathname, history.base + this.props.path)) {
                        return '';
                    }
                    return React.createElement(this.props.component, {history, location});
                }}
            </RouterContext.Consumer>
        )
    }
}

export default Route;