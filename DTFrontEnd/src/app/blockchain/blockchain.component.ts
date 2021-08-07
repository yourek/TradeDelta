import { HttpResponse } from '@angular/common/http';
import { Component, OnInit, ElementRef } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { BlockchainService } from '../services/blockchain.service';

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
  statusNotOk = ['404'];
  pauseRequired = 5 * 60 * 1000; // 5 min required pause after statusNotOk <- trzeba to wziąć z info o API

  statusKey = `${this.element.nativeElement.tagName}-Status`;
  timeStampKey = `${this.element.nativeElement.tagName}-TimeStamp`;

  constructor(
    private BlockchainService: BlockchainService,
    private cookie: CookieService,
    private element: ElementRef
  ) {}

  ngOnInit(): void {}

  getCurrentAccountBalance(account: string) {
    if (this.StatusValidator()) {
      this.BlockchainService.getCurrentAccountData(account).subscribe(
        (response) => {
          this.updateCooke(response);
          var body = response.body;
          this.currentBalance = body.final_balance / this.btcDivider;
        }
      );
    }
  }

  getCurrentLastTransactions(account: string) {
    this.BlockchainService.getCurrentAccountData(account).subscribe(
      (response) => {
        var body = response.body;
        this.lastTransactions = body.value;
        this.lastTransactions.forEach((element) => {
          element /= this.btcDivider;
        });
      }
    );
  }

  StatusValidator(): boolean {
    var isFirstTime = !this.cookie.hasKey(this.statusKey);
    var isStatusOk = this.statusOk.includes(this.cookie.get(this.statusKey));
    var currentTimeStamp = Date.now();
    var isPauseEnough =
      currentTimeStamp - Number(this.cookie.get(this.timeStampKey)) >=
      this.pauseRequired;
    var isNotOkAfterRequiredPause =
      this.statusNotOk.includes(this.cookie.get(this.statusKey)) &&
      isPauseEnough;

    if (isFirstTime) {
      console.log('First Time cookie called...');
      return true;
    } else if (isStatusOk || isNotOkAfterRequiredPause) {
      console.log('Status is OK or Status Not OK but After Pause...');
      return true;
    }
    return false;
  }

  updateCooke(response: HttpResponse<any>) {
    var timeStamp = Date.now();
    this.cookie.put(this.statusKey, response.status.toString());
    this.cookie.put(this.timeStampKey, timeStamp.toString());
  }
}
