import React from 'react';
import List from './list';

class Container extends React.Component {
    componentDidMount() {
        console.log('container did mount');
    }

    componentWillUnmount() {
        console.log('container will unmount');
    }

    // shouldComponentUpdate() {
    //     return false;
    // }

    render() {
        console.log('container render');

        return (
            <section>
                <List prefix={this.props.prefix} />
            </section>
        );
    }
}

export default Container;