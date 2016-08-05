
//import {inject} from 'aurelia-framework';
import 'fetch';
import {HttpClient} from 'aurelia-fetch-client';
let httpClient = new HttpClient();

export class Employeelist{
   consturctor(){
       employeelist = [];
   }
    getdata(){
        httpClient.fetch('http://rest.hakunamatata.in/user/list?authorization=264ec950-5aca-11e6-a17b-2df58744e880')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                console.log(data.userList);
                if(data.statusCode == 200){
                    this.employeelist = data.userList;
                }
            });
    }
}