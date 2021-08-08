import { Component, OnInit } from '@angular/core';
import { KucoinService } from '../services/kucoin.service';

@Component({
  selector: 'app-kucoin',
  templateUrl: './kucoin.component.html',
  styleUrls: ['./kucoin.component.css'],
})
export class KucoinComponent implements OnInit {
  kucoinSymbolsAvailable: symbolsResponse[] = [];
  kucoinOrderBook: orderBookResponse = {
    bids: [],
    asks: [],
  };

  selectedSymbol = 'BTC-USDT';

  constructor(private KucoinService: KucoinService) {}

  ngOnInit(): void {
    console.log('kucoin rendered!');
  }

  apiGetAllSymbols() {
    this.KucoinService.GetAllSymbols().subscribe((response) => {
      this.kucoinSymbolsAvailable = response; // <- dowiedzieć się czemu kucoin blokuje dostęp
    });
  }

  apiGetOrderBook(symbol: string) {
    this.KucoinService.GetOrderBook(symbol).subscribe((response) => {
      console.log(response);
      this.kucoinOrderBook = response;
      //this.kucoinOrderBook.bids = response.bids;
      //this.kucoinOrderBook.asks = response.asks;
    });
  }
}

interface symbolsResponse {
  symbol: string;
  enableTrading: boolean;
}

interface orderBookResponse {
  bids: string[];
  asks: string[];
}
