import { Injectable, EventEmitter } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RestaurantApiService {

    // Scania VPC
    private _baseUrl: string = 'https://api.integration.devtest.aws.scania.com/';
    private _tokenUrl: string = this._baseUrl + 'token';
    private _consumerKey: string = 'BYKd6gLVf0vy99_Aq6Sz1fVhz_Ma';
    private _consumerSecret: string = 'XcjcqukTateews60ffFVGKcnTfsa';

    // Failover API GW
    // private _baseUrl: string = 'https://gateway.api.cloud.wso2.com:443/t/kallekulaab/';
    // private _tokenUrl: string = 'https://gateway.api.cloud.wso2.com:443/token';
    // private _consumerKey: string = 'gUxB69HBWKFMGIbWSJXgvT3ktUQa';
    // private _consumerSecret: string = 'zHizQUHplaxfZ78trVjTB_FoCi4a';

    // General
    private _restaurantsUrl: string = this._baseUrl + 'demolunch/1.0.0/restaurants';
    private _lunchMenuUrl: string = this._baseUrl + 'demolunch/1.0.0/lunch/';
    
    private _accessToken: string;

    public isAuthorized: EventEmitter<boolean> = new EventEmitter<boolean>();

    private _isDebug: boolean = false;

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
        
        if (this._isDebug)
            headers = null;

        let requestOptions: RequestOptions = new RequestOptions({
            headers: headers,
            method: 'GET'
        });
            
        return this.http.get(this._restaurantsUrl, requestOptions).map(res => res.json());
    }

    callLunchService(id: number) {
        let headers: Headers = new Headers();
        headers.append('Authorization', 'Bearer ' + this._accessToken);
        
        if (this._isDebug)
            headers = null;

        let requestOptions: RequestOptions = new RequestOptions({
          headers: headers,
          method: 'GET'
        });
    
        return this.http.get(this._lunchMenuUrl + id.toString(), requestOptions).map(res => res.json());
    }
}