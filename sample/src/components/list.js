import React from 'react';
import Item from './item';

export default class extends React.Component {
    componentDidMount() {
        console.log('list did mount');
    }

    componentWillUnmount() {
        console.log('list will unmount');
    }

    // shouldComponentUpdate() {
    //     return false;
    // }

    render() {
        console.log('list render');

        return (
            <ul>
                {this.props.prefix}
                <Item prefix={this.props.prefix} />
                <Item prefix={this.props.prefix} />
                <Item prefix={this.props.prefix} />
                <Item prefix={this.props.prefix} />
            </ul>
        );
    }
}