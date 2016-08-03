import React from 'react';

export class MyReactComponent extends React.Component {
    render() {
        let { name, onClick } = this.props;
        return (<button onClick={onClick}>Hello, {name}</button>);
    }
}