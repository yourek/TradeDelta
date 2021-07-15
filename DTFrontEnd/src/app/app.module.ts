import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BinanceComponent } from './binance/binance.component';
import { KucoinComponent } from './kucoin/kucoin.component';

@NgModule({
  declarations: [AppComponent, BinanceComponent, KucoinComponent], // komponenty, dyrektywy i konweretry (pipes) które wchodzą w skłdd tego modułu
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
  ], // inne moduły wykorzystywane w tym module
  providers: [
    //{ provide: HTTP_INTERCEPTORS, useClass: null, multi: true },
  ], // serwisy z tego modułu, które będą dostepne z dowolnego miejsca w ekosystemie apki
  bootstrap: [AppComponent], // główne komponenty apki
  exports: [], // artefakty dostępne na zewnątrz tego modułu
})
export class AppModule {}
