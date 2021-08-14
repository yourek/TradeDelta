import { HttpResponse } from '@angular/common/http';
import { Component, OnInit, ElementRef } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { BlockchainService } from '../services/blockchain.service';
import { AppCookiesService } from '../services/cookies.service';

@Component({
  selector: 'app-blockchain',
  templateUrl: './blockchain.component.html',
  styleUrls: ['./blockchain.component.css'],
})
export class BlockchainComponent implements OnInit {
  lastTransDateNumber: number = 0;
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
  lastTransDate = `${this.element.nativeElement.tagName}-LastTransDate`;

  constructor(
    private BlockchainService: BlockchainService,
    private cookie: CookieService,
    private cookiesService: AppCookiesService, //
    private element: ElementRef
  ) {}

  ngOnInit(): void {}

  GetCurrentAccountBalance(account: string) {
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
      this.BlockchainService.GetCurrentAccountData(account, this.limit).subscribe(
        (response) => {
          //console.log(response);
          this.cookiesService.UpdateCookie(
            response,
            this.cookie,
            this.statusKey,
            this.timeStampKey
          );

          this.lastTransDateNumber = Number(this.cookiesService.GetLastTransDateBlockchain(this.cookie, this.lastTransDate));
          
          this.addressData = response.body;
          this.lastTransactions = this.addressData.txs;
          // this.lastTransactions.forEach(element => {
          //   console.log(element.result);
          // })

          this.cookiesService.UpdateLastTransDateBlockchain(this.lastTransDate, this.cookie, this.lastTransactions[0]);
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
      this.BlockchainService.GetCurrentAccountData(account, this.limit).subscribe(
        (response) => {
          this.cookiesService.UpdateCookie(
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
