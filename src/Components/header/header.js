import {customElement, bindable} from "aurelia-framework";
import {autoinject} from "aurelia-dependency-injection";

export class Header {

@bindable title:string;

    attached() {
        $(this.sideNav).sideNav({closeOnClick: true});
    }
}