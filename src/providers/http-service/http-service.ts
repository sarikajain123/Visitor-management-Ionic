import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/timer';


@Injectable()
export class HttpServiceProvider {
  isNetworkAlertShown: boolean = false;

  constructor(public http: HttpClient) {
    // console.log('Hello HttpServiceProvider Provider');
    // if (navigator['network']['connection']['type'] === 'none') {
    //   this.showNoNetworkMessage();
    // }
  }


  post_Data(
    url: string,
    payload: any,
    isJSON?: boolean,
    multipartFormData?
  ): Observable<any> {
    const bodyString = JSON.stringify(payload);
    let headers = new HttpHeaders();
    headers.set('Content-Type', null);
    headers.set('Accept', "multipart/form-data");

    return this.http
      .post(url, payload, { headers: headers })
      .map((res: Response) => {
        // let reponse: any;
        // if (isJSON || multipartFormData) {
        //   reponse = res.json();
        // } else {
        //   reponse = (res) ? res.text() : res;
        // }
        return res;
      })
      .catch(this.handleError);

  }

  get_Data(
    url: string,
    isJSON: boolean,
    // mobile?:string
  ): Observable<any> {
    let headers = new HttpHeaders({
      Accept: 'application/json'
    });
    // if (id) {
    //   headers = headers.set('Id', id.toString());
    // }

    // if (mobile) {
    //   console.log('http_get_mobile', mobile);
    //   // headers = headers.set('visitor_phone', '123456789');
    //   // headers.append("visitor_phone", '123456789');
    // }

    return this.http
      .get(url, { headers: headers })
      .map((res: Response) => {
        let reponse: any;
        if (isJSON) {
          reponse = res;
        } else {
          reponse = (res) ? res.text() : res;
        }
        return reponse;
      })
      .catch(this.handleError);
  }


  put_Data(
    url: string,
    payload: any,
    // token: any,
    isJSON: boolean
  ): Observable<any> {
    const bodyString = JSON.stringify(payload);

    let headers: any;
    if (isJSON) {
      headers = new HttpHeaders({
        'Content-Type': 'application/json; charset=utf8',
        'Accept': 'application/json',
        // Authorization: 'Bearer ' + token
      });
    } else {
      headers = new HttpHeaders({
        // Authorization: 'Bearer ' + token
      });
    }

    const options = new RequestOptions({ headers: headers });

    return this.http
      .put(url, payload, { headers: headers })
      .map((res: Response) => {
        let reponse: any;
        if (isJSON) {
          reponse = res;
        } else {
          reponse = (res) ? res.text() : res;
        }
        return reponse;
      })
      .catch(this.handleError);
  }

  delete_Data(url: string,
    // token: any,
    isJSON: boolean, siteId?): Observable<any> {

    let headers = new HttpHeaders({
      'Accept': 'application/json',
      // Authorization: 'Bearer ' + token
    });

    if (siteId) {
      headers = headers.set('siteId', siteId.toString());
    }

    // const options = new RequestOptions({ headers });
    return this.http
      .delete(url, { headers: headers })
      .map((res: Response) => {
        let reponse: any;
        if (isJSON) {
          reponse = res;
        } else {
          reponse = (res) ? res.text() : res;
        }
        return reponse;
      })
      .catch(this.handleError);
  }

  private handleError(error: any) {
    console.error('errMsg in handleError : ', error);
    return error;
  }

  // Display message if Mobile App is not connected to internet.
  private showNoNetworkMessage() {
    if (this.isNetworkAlertShown === false) {
      alert('Please check your network connection and try again.');
      this.isNetworkAlertShown = true;
      const timer = Observable.timer(10000);
      timer.subscribe(t => this.isNetworkAlertShown = false);
    }
  }

}
