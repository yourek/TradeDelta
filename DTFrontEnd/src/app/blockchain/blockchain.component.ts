import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BlockchainService } from '../services/blockchain.service';

@Component({
  selector: 'app-blockchain',
  templateUrl: './blockchain.component.html',
  styleUrls: ['./blockchain.component.css']
})
export class BlockchainComponent implements OnInit {
  currentBalance: number = 0;
  addressData: singleAddressData = {
    hash160:        "",
    address:        "",
    n_tx:           0,
    n_unredeemed:   0,
    total_received: 0,
    total_sent:     0,
    final_balance:  0,
    txs:            [],
  };
  lastTrans: transData = this.addressData.txs[0];
  //lastTransValue: number = this.lastTrans.result;
  selectedAddress: string = '1P5ZEDWTKTFGxQjZphgWPQUpe554WKDfHQ';
  btcDivider: number = 100000000;

  constructor(private BlockchainService: BlockchainService) { }

  ngOnInit(): void {
  }

  getCurrentAccountBalance(account: string) {
    this.BlockchainService.getCurrentAccountData(account, '3').subscribe((response) => {
      this.currentBalance = response.final_balance / this.btcDivider;
    })
  }

  getCurrentLastTransactions(account: string) {
    this.BlockchainService.getCurrentAccountData(account, '3').subscribe((response) => {
      this.addressData = response;
    })
  }
}

interface singleAddressData {
  hash160:        string;
  address:        string;
  n_tx:           number;
  n_unredeemed:   number;
  total_received: number;
  total_sent:     number;
  final_balance:  number;
  txs:            transData[];
}

interface transData {
  hash:         string;
  ver:          number;
  vin_sz:       number;
  vout_sz:      number;
  size:         number;
  weight:       number;
  fee:          number;
  relayed_by:   string;
  lock_time:    number;
  tx_index:     number;
  double_spend: boolean;
  time:         number;
  block_index:  number;
  block_height: number;
  inputs:       inputsItem[];
  out:          outItem[];
  result:       number;
  balance:      number;
}

interface inputsItem {
  sequence: number;
  witness:  string;
  script:   string;
  index:    number;
  prev_out: prevOutData;
}

interface outItem {
  type:               number;
  spent:              boolean;
  value:              number;
  spending_outpoints: spendingData;
  n:                  number;
  tx_index:           number;
  script:             string;
  addr:               string;
}

interface prevOutData {
  spent:              boolean;
  script:             string;
  spending_outpoints: spendingData;
  tx_index:           number;
  value:              number;
  addr:               string;
  n:                  number;
  type:               number;
}

interface spendingData {
  tx_index: number;
  n:        number;
}


interface transDataOld {
  hash:         string;
  ver:          number;
  vin_sz:       number;
  vout_sz:      number;
  lock_time:    string;
  size:         number;
  relayed_by:   string;
  block_height: number;
  tx_index:     string;
  inputs:       string[];
  out:          string[];
}