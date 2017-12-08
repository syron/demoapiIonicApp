/// <reference path="../../../typings/index.d.ts" />

import { Component } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { NavController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { RestaurantPage } from '../restaurant/restaurant';
import { RestaurantApiService } from '../../services/restaurantapi.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [RestaurantApiService]
})
export class HomePage {
  restaurants: any = null;

  constructor(public navCtrl: NavController, private http: Http, public restaurantApiService: RestaurantApiService) {
    this.restaurantApiService.isAuthorized.subscribe(data => {
      this.restaurantApiService.callRestaurantEndpoint().subscribe(data => {
        this.restaurants = data;
      });
    });    
  }

  restaurantChosen(id, name) {
    this.navCtrl.push(RestaurantPage, {
      restaurantId: id,
      name: name
    });
  }
}
