import { Component } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { NavController, NavParams } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { RestaurantApiService } from '../../services/restaurantapi.service';

@Component({
  selector: 'page-restaurant',
  templateUrl: 'restaurant.html',
  providers: [RestaurantApiService]
})
export class RestaurantPage {
  name: string;
  restaurantId: number = null;
  menu: any = null;
  isLoading: boolean = false;

  constructor(private navParams: NavParams, public navCtrl: NavController, private http: Http, public restaurantApiService: RestaurantApiService) {
    this.name = this.navParams.get('name');
    this.restaurantId = this.navParams.get('restaurantId');

    this.isLoading = true;
    this.restaurantApiService.isAuthorized.subscribe(data => {
      this.restaurantApiService.callLunchService(this.restaurantId).subscribe(data => {
        this.menu = data;
        this.isLoading = false;
      });
    });
  }
}
