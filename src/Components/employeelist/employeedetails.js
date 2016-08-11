/**
 * Created by hmspl on 10/8/16.
 */
import pagerserv from '../commomclass/pager-services.js';
import {inject} from 'aurelia-framework';
@inject(pagerserv)
export class Employeedetails{

    constructor(pagerserv){
        //this.pagerserv = pagerserv;
        //console.log(this.pagerserv.employee_detailAry)
        this.employeedetail = JSON.parse('['+ localStorage.getItem('employe') +']');
    }
    attached(){

    }

}
