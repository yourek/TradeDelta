import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BinanceService {
  rootUrl = 'https://api.binance.com/api/v3/time';
  exchangeInfoUrl = 'https://api.binance.com/api/v3/exchangeInfo';
  avgPrice = 'https://api.binance.com/api/v3/avgPrice';

  constructor(private http: HttpClient) {}

  fetchExchangeInfo() {
    return this.http.get<any>(this.exchangeInfoUrl);
  }

  fetchTime() {
    return this.http.get<any>(this.rootUrl);
  }

  fetchAvgPrice(symbol: string) {
    return this.http.get<any>(this.avgPrice, {
      params: { symbol: symbol },
    });
  }
}
