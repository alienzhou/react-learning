// cSpell: ignore alienact
import React from 'alienact';
import {RouterContext} from './context';
import {ContextValue} from './types';

class Link extends React.Component {
    render() {
        return (
            <RouterContext.Consumer>
                {(value: ContextValue): any => {
                    const {
                        replace,
                        to,
                        ...rest
                    } = this.props;
                    return (
                        <a
                            {...rest}
                            onClick={(e: TrackEvent) => {
                                e.preventDefault();
                                if (replace) {
                                    value.history.replace(replace);
                                }
                                else {
                                    value.history.push(to);
                                }
                            }}
                        />
                    );
                }}
            </RouterContext.Consumer>
        )
    }
}

export default Link;