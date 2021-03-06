import React from 'react';

export default class extends React.Component {
    componentDidMount() {
        console.log('item did mount');
    }

    componentWillUnmount() {
        console.log('item will unmount');
    }

    shouldComponentUpdate() {
        return false;
    }

    componentDidUpdate() {
        console.log('item update');
    }

    render() {
        console.log('item render');
        return (
            <li>{this.props.prefix} - {Math.random()}</li>
        );
    }
}