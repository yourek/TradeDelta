import { HttpResponse } from '@angular/common/http';
import { Component, OnInit, ElementRef } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { BlockchainService } from '../services/blockchain.service';
import { CookiesService } from '../services/cookies.service';

@Component({
  selector: 'app-blockchain',
  templateUrl: './blockchain.component.html',
  styleUrls: ['./blockchain.component.css'],
})
export class BlockchainComponent implements OnInit {
  currentBalance: number = 0;
  lastTransactions: number[] = [];
  selectedAddress: string = '1P5ZEDWTKTFGxQjZphgWPQUpe554WKDfHQ';
  btcDivider: number = 100000000;

  statusOk = ['200'];
  statusNotOk = ['404', '238'];
  pauseRequired = 5 * 60 * 1000; // 5 min required pause after statusNotOk <- trzeba to wziąć z info o API

  statusKey = `${this.element.nativeElement.tagName}-Status`;
  timeStampKey = `${this.element.nativeElement.tagName}-TimeStamp`;

  constructor(
    private BlockchainService: BlockchainService,
    private cookie: CookieService,
    private cookiesService: CookiesService, //
    private element: ElementRef
  ) {}

  ngOnInit(): void {}

  getCurrentAccountBalance(account: string) {
    if (
      this.cookiesService.StatusValidator(
        this.cookie,
        this.statusOk,
        this.statusNotOk,
        this.statusKey,
        this.timeStampKey,
        this.pauseRequired
      )
    ) {
      this.BlockchainService.getCurrentAccountData(account).subscribe(
        (response) => {
          //console.log(response);
          this.cookiesService.updateCookie(
            response,
            this.cookie,
            this.statusKey,
            this.timeStampKey
          );
          var body = response.body;
          this.currentBalance = body.final_balance / this.btcDivider;
        }
      );
    }
  }

  getCurrentLastTransactions(account: string) {
    if (
      this.cookiesService.StatusValidator(
        this.cookie,
        this.statusOk,
        this.statusNotOk,
        this.statusKey,
        this.timeStampKey,
        this.pauseRequired
      )
    ) {
      this.BlockchainService.getCurrentAccountData(account).subscribe(
        (response) => {
          this.cookiesService.updateCookie(
            response,
            this.cookie,
            this.statusKey,
            this.timeStampKey
          );
          var body = response.body;
          this.lastTransactions = body.value;
          this.lastTransactions.forEach((element) => {
            element /= this.btcDivider;
          });
        }
      );
    }
  }
}
