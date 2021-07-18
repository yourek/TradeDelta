import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { BinanceComponent } from './binance/binance.component';
import { BlockchainComponent } from './blockchain/blockchain.component';
import { KucoinComponent } from './kucoin/kucoin.component';

const routes: Routes = [
  { path: '', redirectTo: '/binance', pathMatch: 'full' },
  { path: 'binance', component: BinanceComponent },
  { path: 'kucoin', component: KucoinComponent },
  { path: 'blockchain', component: BlockchainComponent },
  { path: '*', component: BinanceComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
