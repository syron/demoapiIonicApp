import { Component } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { NavController, NavParams } from 'ionic-angular';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-restaurant',
  templateUrl: 'restaurant.html'
})
export class RestaurantPage {
  lunchMenuUrl: string = 'http://scaniademoapi.azurewebsites.net/api/lunch/';
  
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
    this.http.get(this.lunchMenuUrl + id.toString()).map(res => res.json()).subscribe(data => {
      this.menu = data;
    });
  }
}
