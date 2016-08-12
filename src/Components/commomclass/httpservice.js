/**
 * Created by hmspl on 12/8/16.
 */
import 'fetch';
import {HttpClient} from 'aurelia-fetch-client';
import {inject} from 'aurelia-framework';

@inject(HttpClient)
export class HttpValueConverter {
    constructor(httpClient) {
        this.httpClient = httpClient;
        this.authorization ='2b7a87d0-6041-11e6-a762-2d2501aea41f';
    }
    getMyData(url,method) {
        return this.httpClient.fetch('http://rest.hakunamatata.in/'+url+'?authorization='+this.authorization,
            { method: method})
            .then(response => response.json());
    }
}
