import { Component } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { NavController, NavParams } from 'ionic-angular';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-restaurant',
  templateUrl: 'restaurant.html'
})
export class RestaurantPage {
  lunchMenuUrl: string = 'https://api.integration.devtest.aws.scania.com/lunch/1.0/lunch/';
  
  name: string;
  restaurantId: number = null;
  restaurants: any = null;
  menu: any = null;

  constructor(private navParams: NavParams, public navCtrl: NavController, private http: Http) {
    this.name = this.navParams.get('name');
    this.restaurantId = this.navParams.get('restaurantId');
    this.callLunchService(this.restaurantId);
  }

  callLunchService(id: number) {
    var token = 'ab3085af-d43a-34e8-9782-cf0c235e26d5';
    
    let headers: Headers = new Headers();
    headers.append('Authorization', 'Bearer ' + token);

    let method = 'GET';
    
    let requestOptions: RequestOptions = new RequestOptions({
      headers: headers,
      method: method
    });

    this.http.get(this.lunchMenuUrl + id.toString(), requestOptions).map(res => res.json()).subscribe(data => {
      this.menu = data;
    });
  }
}
