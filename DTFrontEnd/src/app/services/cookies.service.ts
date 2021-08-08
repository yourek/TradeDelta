import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie';

@Injectable({
  providedIn: 'root',
})
export class CookiesService {
  constructor() {}

  StatusValidator(
    cookie: CookieService,
    statusOk: string[],
    statusNotOk: string[],
    statusKey: string,
    timeStampKey: string,
    pauseRequired: number
  ): boolean {
    var isFirstTime = !cookie.hasKey(statusKey);
    var isStatusOk = statusOk.includes(cookie.get(statusKey));

    var currentTimeStamp = Date.now();
    var isPauseEnough =
      currentTimeStamp - Number(cookie.get(timeStampKey)) >= pauseRequired;
      
    var isNotOkAfterRequiredPause =
      statusNotOk.includes(cookie.get(statusKey)) && isPauseEnough;

    if (isFirstTime) {
      console.log('First Time cookie called...');
      return true;
    } else if (isStatusOk || isNotOkAfterRequiredPause) {
      console.log('Status is OK or Status Not OK but After Pause...');
      return true;
    }
    return false;
  }

  updateCookie(
    response: HttpResponse<any>,
    cookie: CookieService,
    statusKey: string,
    timeStampKey: string
  ) {
    var timeStamp = Date.now();
    cookie.put(statusKey, response.status.toString());
    cookie.put(timeStampKey, timeStamp.toString());
  }
}
