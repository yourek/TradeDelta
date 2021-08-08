import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BaseRouteReuseStrategy } from '@angular/router';

//const BASE_PATH = "https://api.blockchain.com/v3/exchange/";
const BASE_PATH = "https://blockchain.info/rawaddr/";

@Injectable({
  providedIn: 'root'
})
export class BlockchainService {

  constructor(private http: HttpClient) { }

  // getCurrentAccountDataOld(account: string, limit: number) {
  //   return this.http.get<any>(BASE_PATH + account, {
  //     params: { limit: limit },
  //   });
  // }

  getCurrentAccountData(account: string, limit: string) {
    return this.http.get<any>(BASE_PATH + account, {
      params: { limit: limit },
    });
  }
}
