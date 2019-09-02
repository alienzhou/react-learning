// cSpell: ignore alienact
import React from 'alienact';
import {RouterContext} from './context';
import {ILocation} from './types';

class Router extends React.Component {
    private isMount: boolean = false;
    private off: Function = null;
    state: any;
    private pendingLocation: ILocation = null;

    constructor(props: any) {
        super(props);

        this.state = {
            location: props.history.location
        };

        this.off = props.history.on((location: ILocation) => {
            if (this.isMount) {
                this.setState({location});
            }
            else {
                this.pendingLocation = location;
            }
        });
    }

    componentDidMount() {
        this.isMount = true;
        if (this.pendingLocation) {
            this.setState({
                location: this.pendingLocation
            });
        }
    }

    componentWillUnmout() {
        if (this.off) {
            this.off();
        }
    }

    render() {
        this.props.history.base = this.props.base || '';

        return (
            <RouterContext.Provider value={this.props.history}>
                {this.props.children}
            </RouterContext.Provider>
        )
    }
}

export default Router;