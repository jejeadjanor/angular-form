import { Injectable } from '@angular/core';
import { UserSettings } from './user-settings';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }
  getSubscriptionTypes() {
    return of(['Monthly', 'Annual', 'Lifetime']);
  }

  postUserSettingsForm(userSettings: UserSettings): Observable<any>{
    //using PutsReq url. create and use the endpoint
    return this.http.post('https://putsreq.com/E8YW3dWCcOCdemN4CTB2', userSettings);

    // return of(userSettings);
  }
}
