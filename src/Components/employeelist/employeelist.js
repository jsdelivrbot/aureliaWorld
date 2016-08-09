
//import {inject} from 'aurelia-framework';
import 'fetch';
import {HttpClient} from 'aurelia-fetch-client';
let httpClient = new HttpClient();

export class Employeelist{
    constructor(){
       this.employeelist = [];
        this.column = 'userId';
        this.direction = 'ascending';
      // this.getdata();

   }
    attached(){
        $('select').material_select();
        this.limit = 10;

       // $('select').material_select('destroy');
    }
    bind(bindingContext, overrideContext) {
        // Invoked once the databinding is activated...
       // alert();
    }
    sortingfunc(propname){
        this.column = propname;
        this.direction = ( this.direction != 'ascending') ? 'ascending' : 'descending';

    }
    activate(){
        httpClient.fetch('http://rest.hakunamatata.in/user/list?authorization=76e6a910-5de9-11e6-a762-2d2501aea41f')
            .then(response => response.json())
            .then(data => {
                if(data.statusCode == 200){
                    this.employeelist = data.userList;
                }
            });
    }

}