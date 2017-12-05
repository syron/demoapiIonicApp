import { Component } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { NavController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { RestaurantPage } from '../restaurant/restaurant';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  restaurantUrl: string = 'http://scaniademoapi.azurewebsites.net/api/restaurants';
  lunchMenuUrl: string = 'http://scaniademoapi.azurewebsites.net/api/lunch/';
  
  restaurants: any = null;
  menu: any = null;

  constructor(public navCtrl: NavController, private http: Http) {
    this.callRestaurantEndpoint();
  }

  callRestaurantEndpoint() {
    this.http.get(this.restaurantUrl).map(res => res.json()).subscribe(data => {
      console.log(data);
      this.restaurants = data;
    });
  }

  restaurantChosen(id, name) {
    console.log(id, name);
    this.navCtrl.push(RestaurantPage, {
      restaurantId: id,
      name: name
    });
  }
}
