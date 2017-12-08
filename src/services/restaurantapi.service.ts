import { Injectable, EventEmitter } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RestaurantApiService {

    private _restaurantsUrl: string = 'https://api.integration.devtest.aws.scania.com/lunch/1.0/restaurants';
    private _lunchMenuUrl: string = 'https://api.integration.devtest.aws.scania.com/lunch/1.0/lunch/';
    private _tokenUrl: string = 'https://api.integration.devtest.aws.scania.com/token';

    private _consumerKey: string = 'evE0u48rNAxxDw2Rl_YQHmKzQbEa';
    private _consumerSecret: string = 'EVLWUbtbwi1zXLaMr3j3ixmvRgsa';

    private _accessToken: string;

    public isAuthorized: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor(private http: Http) {
        this.getAccessToken(this._consumerKey, this._consumerSecret);
    }

    getAccessToken(consumerKey: string, consumerSecret: string) {
        var buffer = new Buffer(consumerKey + ":" + consumerSecret).toString('base64');
    
        let headers: Headers = new Headers();
        headers.append('Authorization', 'Basic ' + buffer);
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        
        var dataString = 'grant_type=client_credentials';
    
        let requestOptions: RequestOptions = new RequestOptions({
          headers: headers,
          method: 'POST',
          body: dataString
        });
    
        return this.http.post(this._tokenUrl, dataString, requestOptions).map(res => res.json()).subscribe(data => {
            this._accessToken = data.access_token;

            this.isAuthorized.emit(true);
        });
    }

    callRestaurantEndpoint() {
        let headers: Headers = new Headers();
        headers.append('Authorization', 'Bearer ' + this._accessToken);
    
        let requestOptions: RequestOptions = new RequestOptions({
            headers: headers,
            method: 'GET'
        });
            
        return this.http.get(this._restaurantsUrl, requestOptions).map(res => res.json());
    }

    callLunchService(id: number) {
        let headers: Headers = new Headers();
        headers.append('Authorization', 'Bearer ' + this._accessToken);
        
        let requestOptions: RequestOptions = new RequestOptions({
          headers: headers,
          method: 'GET'
        });
    
        return this.http.get(this._lunchMenuUrl + id.toString(), requestOptions).map(res => res.json());
    }
}