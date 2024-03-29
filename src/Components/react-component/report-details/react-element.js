import React from 'react';
import ReactDOM from 'react-dom';
import {customElement, inject, bindable, noView} from 'aurelia-framework';

import ReleaseDetail from 'Components/react-component/report-details/report-detail.jsx!jsx';

@noView()
@inject(Element)

@customElement('release-element')
export class ReactElement {
    reactComponent = {};

    constructor(element) {
        this.element = element;
    }

    render() {
        this.reactComponent = ReactDOM.render(
           <ReleaseDetail/>,
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