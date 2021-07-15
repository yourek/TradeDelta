import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { BinanceComponent } from './binance/binance.component';

const routes: Routes = [
  { path: '*', redirectTo: 'binance' },
  { path: 'binance', component: BinanceComponent },
  //{ path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
