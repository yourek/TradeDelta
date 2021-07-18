import { Component } from '@angular/core';
import { timer } from 'rxjs';
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  projectName: String = 'TradeDelta';
  lastRefresh: Date = new Date();
  status: boolean = false;

  ngOnInit() {
    this.resizeContentToFullWidth();

    const timerRoot = timer(1000, 10000);
    timerRoot.subscribe(() => {
      //  Tutaj będziemy triggerować kodzik apki - requesty co 10 sekund aktualnie
      this.lastRefresh = new Date();
      console.log('refreshed!');
      console.log(this.lastRefresh);
    });
  }

  resizeContentToFullWidth() {
    var viewportWidth = $(window).width();
    if (!viewportWidth) {
      viewportWidth = 1024;
    }
    $('.content').css('width', `${viewportWidth - 240}px`);
  }
}
