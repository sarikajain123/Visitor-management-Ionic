import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the AuthenticationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthenticationProvider {

  login(society: any, pass: any): any {
    throw new Error("Method not implemented.");
  }

  constructor(public http: HttpClient) {
    console.log('Hello AuthenticationProvider Provider');
  }

}
