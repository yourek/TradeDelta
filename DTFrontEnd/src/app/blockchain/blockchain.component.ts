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
  addressData: any;
  lastTransactions: any[] = [];
  selectedAddress: string = '1P5ZEDWTKTFGxQjZphgWPQUpe554WKDfHQ';
  btcDivider: number = 100000000;
  limit: number = 5;

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
      this.BlockchainService.getCurrentAccountData(account, this.limit).subscribe(
        (response) => {
          //console.log(response);
          this.cookiesService.updateCookie(
            response,
            this.cookie,
            this.statusKey,
            this.timeStampKey
          );
          this.addressData = response.body;
          this.lastTransactions = this.addressData.txs;
          // this.lastTransactions.forEach(element => {
          //   console.log(element.result);
          // })
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
      this.BlockchainService.getCurrentAccountData(account, this.limit).subscribe(
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
