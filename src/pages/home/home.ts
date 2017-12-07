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
restaurantUrl: string = 'https://api.integration.devtest.aws.scania.com/lunch/1.0/restaurants';
  
  restaurants: any = null;
  menu: any = null;

  constructor(public navCtrl: NavController, private http: Http) {
    this.callRestaurantEndpoint();
  }

  callRestaurantEndpoint() {
    var token = 'ab3085af-d43a-34e8-9782-cf0c235e26d5';

    let headers: Headers = new Headers();
    headers.append('Authorization', 'Bearer ' + token);

    let method = 'GET';
    
    let requestOptions: RequestOptions = new RequestOptions({
      headers: headers,
      method: method
    });
    

    this.http.get(this.restaurantUrl, requestOptions).map(res => res.json()).subscribe(data => {
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
