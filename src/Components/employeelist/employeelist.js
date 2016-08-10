
//import {inject} from 'aurelia-framework';
import 'fetch';
import {HttpClient} from 'aurelia-fetch-client';
import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import pagerserv from '../commomclass/pager-services.js';
import {BindingEngine} from 'aurelia-binding';
import {Router} from 'aurelia-router';
let httpClient = new HttpClient();


@inject(pagerserv,BindingEngine,Router)
export class Employeelist{

    static inject() { return [Router]; }

    constructor(pagerserv,bindingEngine,router){
        this.employeelist = [];
        this.column = 'userId';
        this.direction = 'ascending';
        this.pageSize = 10;
        this.pageCount = 0;
        this.pageIndex = 0;
        this.takefrm  = 0;
        this.pagerserv = pagerserv;
        //
        let subscription = bindingEngine.propertyObserver(this.pagerserv, 'araylenght')
            .subscribe((newValue, oldValue) => this.actionpagination(newValue));
        this.theRouter = router;
   }


    attached() {
        $('select').material_select();
        this.pageCount = this.pagerserv.araylenght;
    }
    sortingfunc(propname){
        this.column = propname;
        this.direction = ( this.direction != 'ascending') ? 'ascending' : 'descending';
    }
    activate() {
        this.load();
    }
    actionpagination(arraylength){
        this.pageCount = arraylength;
        this.setPage(0);
    }
//this.pageCount = newValue
    setPage(index) {
        this.pageIndex = index;
        this.takefrm = this.pageIndex * 10;
    }
    empdetail(uid){
    // console.log(uid);
        //this.pagerserv.employee_detailAry = uid;
        localStorage.setItem('employe', JSON.stringify(uid));
        this.theRouter.navigate("employee/:details");

        //let userprofile = this.router.routes.find(x => x.name === 'sibi');
        //userprofile.name = username;
        //this.router.navigateToRoute('employee/:details');
    }

    load(){
        httpClient.fetch('http://rest.hakunamatata.in/user/list?authorization=a11a8c60-5efc-11e6-a762-2d2501aea41f')
            .then(response => response.json())
            .then(data => {
                if(data.statusCode == 200){
                    var pages = data.userList.length / 10;
                    this.pagerserv.araylenght = Math.round(pages + 0.4);
                    this.employeelist = data.userList;
                }
            });
    }

}
@inject(Employeelist)
export class FilterValueConverter {

    constructor(Employeelist){
        this.myserv = Employeelist;

    }
    toView(array, property, query) {
        if (query === void 0 || query === null || query === "" || !Array.isArray(array)) {
            return array;
        }

        let properties = (Array.isArray(property) ? property : [property]),
            term = String(query).toLowerCase();

        var filterArray = array.filter((entry) =>
            properties.some((prop) =>
            String(entry[prop]).toLowerCase().indexOf(term) >= 0));
        var pages = filterArray.length / 10;
        pagerserv.araylenght = Math.round(pages + 0.4);
        //pagerserv.araylenght = filterArray.length / 10;
        return filterArray;
    }
}