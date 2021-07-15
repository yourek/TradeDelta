import { Component, OnInit } from '@angular/core';
import { BinanceService } from '../services/binance.service';

@Component({
  selector: 'app-binance',
  templateUrl: './binance.component.html',
  styleUrls: ['./binance.component.css'],
})
export class BinanceComponent implements OnInit {
  binanceSymbolsAvailable: symbolsResponse[] = [];
  binanceAvgPrice: avgPriceResponse = {
    mins: 0,
    price: '0',
  };

  selectedSymbol: string = 'ETHBTC';

  constructor(private BinanceService: BinanceService) {}
  
  ngOnInit(): void {}

  apiFetchTime() {
    this.BinanceService.fetchTime().subscribe((response) => {
      console.log(response);
    });
  }

  apiFetchExchangeInfo() {
    this.BinanceService.fetchExchangeInfo().subscribe((response) => {
      //console.log(response);
      this.binanceSymbolsAvailable = response.symbols;
      //this.binanceSymbolsAvailable.filter(x => x.status == "TRADING")
    });
  }

  apiFetchAvgPrice(symbol: string) {
    this.BinanceService.fetchAvgPrice(symbol).subscribe((response) => {
      console.log(response);
      this.binanceAvgPrice = response;
      console.log(this.binanceAvgPrice);
    });
  }
}

interface symbolsResponse {
  symbol: string;
  status: string;
}

interface avgPriceResponse {
  mins: number;
  price: string;
}
