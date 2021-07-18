import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

const BASE_PATH = 'https://api.kucoin.com/api/v1/'; //.replace(/\/+$/, "");

@Injectable({
  providedIn: 'root',
})
export class KucoinService {
  allSymbolsUrl = BASE_PATH + 'symbols';
  orderBookUrl = BASE_PATH + 'market/orderbook/level2_20';

  constructor(private http: HttpClient) {}

  GetAllSymbols() {
    return this.http.get<any>(this.allSymbolsUrl);
  }

  GetOrderBook(symbol: string) {
    return this.http.get<any>(this.orderBookUrl, {
      params: { symbol: symbol },
    });
  }
}
