import React from 'react';
import ReactDOM from 'react-dom';
import {customElement, inject, bindable, noView} from 'aurelia-framework';

import MyReactElement from 'Components/react-component/my-react-element.jsx!jsx';

@noView()
@inject(Element)
@bindable('data')
@bindable('myfun')
@bindable('myrouter')


@customElement('react-element')
export class ReactElement {
    reactComponent = {};

    constructor(element) {
        this.element = element;
    }

    render() {
        this.reactComponent = ReactDOM.render(
            <MyReactElement data={this.data} myfun={this.myfun} theRouter={this.myrouter}/>,
            this.element
        );
    }

    bind() {
        this.render();
    }

    /**
     * Data Changed
     *
     * An automatic callback function when our "data"
     * bindable value changes. We need to rebind the React
     * element to get the new data from the ViewModel.
     *
     * @param {any} newVal The updated data
     * @returns {void}
     *
     */
    dataChanged(newVal) {
        this.bind();
    }

}