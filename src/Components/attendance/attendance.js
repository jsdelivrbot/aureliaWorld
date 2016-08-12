import 'fetch';
import {HttpClient} from 'aurelia-fetch-client';
import {inject} from 'aurelia-framework';
import {HttpValueConverter} from '../commomclass/httpservice.js';

@inject(HttpValueConverter)
export class Attendance{

    constructor(HttpValueConverter){
        this.HttpValueConverter = HttpValueConverter;
    }

    attached(){

    }

    activate(){
        this.load();
    }

    load(){
        this.HttpValueConverter.getMyData('attendance/163/08-2016','GET')
        .then(data => {
                console.log(data);
            })
    }
}