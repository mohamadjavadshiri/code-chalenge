import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  baseUrl = 'https://weatherapi-com.p.rapidapi.com/current.json'
  constructor(
    private httpClient: HttpClient
  ) {

  }


  getApi() {

    return this.httpClient.get(this.baseUrl, {
      params: { q: '53.1,-0.13' }, headers: {
        'X-RapidAPI-Key': 'f4f8360e06msh25879dfc90bd721p103ca5jsnf28d3051a56e',
        'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
      }
    })
  }
}
