// cSpell: ignore alienact
import React from 'alienact';
import {RouterContext} from './context';
import {IHistory} from './types';

class Link extends React.Component {
    render() {
        return (
            <RouterContext.Consumer>
                {(history: IHistory): any => {
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
                                    history.replace(replace);
                                }
                                else {
                                    history.push(to);
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