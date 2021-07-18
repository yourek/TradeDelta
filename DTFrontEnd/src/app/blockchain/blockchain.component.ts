import { Component, OnInit } from '@angular/core';
import { BlockchainService } from '../services/blockchain.service';

@Component({
  selector: 'app-blockchain',
  templateUrl: './blockchain.component.html',
  styleUrls: ['./blockchain.component.css']
})
export class BlockchainComponent implements OnInit {
  currentBalance: number = 0;
  lastTransactions: number[] = [];
  selectedAddress: string = '1P5ZEDWTKTFGxQjZphgWPQUpe554WKDfHQ';
  btcDivider: number = 100000000;

  constructor(private BlockchainService: BlockchainService) { }

  ngOnInit(): void {
  }

  getCurrentAccountBalance(account: string) {
    this.BlockchainService.getCurrentAccountData(account).subscribe((response) => {
      this.currentBalance = response.final_balance / this.btcDivider;
    })
  }

  getCurrentLastTransactions(account: string) {
    this.BlockchainService.getCurrentAccountData(account).subscribe((response) => {
      this.lastTransactions = response.value;
      this.lastTransactions.forEach(element => {
        element /= this.btcDivider;
      });
    })
  }

}
