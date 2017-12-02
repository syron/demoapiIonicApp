import { Component } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { NavController } from 'ionic-angular';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  menu: any = null;

  constructor(public navCtrl: NavController, private http: Http) {
    this.callLunchService();
  }

  callLunchService() {
    var clientId = "";
    var clientSecret = "";

    let headers = new Headers({'Content-Type': 'application/json'});  
    headers.append('Authorization','Bearer a1f5f0c6-949b-37e2-bb35-ace391c8a666')
    let options = new RequestOptions( { headers: headers } );

    this.http.get('https://gateway.api.cloud.wso2.com:443/t/kallekulaab/demoapi/v1/api/Lunch', options).map(res => res.json()).subscribe(data => {
        console.log(data);
        this.menu = data;
    });
  }
}
