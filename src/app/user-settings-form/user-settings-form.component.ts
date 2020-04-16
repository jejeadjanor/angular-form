import { Component, OnInit } from '@angular/core';
import {UserSettings} from '../data/user-settings';
import { NgForm, NgModel } from '@angular/forms';
import { DataService } from '../data/data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-settings-form',
  templateUrl: './user-settings-form.component.html',
  styleUrls: ['./user-settings-form.component.css']
})
export class UserSettingsFormComponent implements OnInit {
  
  originalUserSettings : UserSettings = {
    name: 'Jemima',
    emailOffers: true,
    interfaceStyle: 'dark',
    subscriptionType: 'Annual',
    notes: 'Here are some notes...'

  }

  singleModel = 'On';
  startDate: Date;
  startTime: Date;
  userRating= 0;
  maxRating= 10;
//Copying Form Data so the original data can be kept if you cancel the form fill
  userSettings : UserSettings = { ...this.originalUserSettings};
  postError = false;
  postErrorMessage = '';
  subscriptionTypes : Observable<string[]>;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.subscriptionTypes = this.dataService.getSubscriptionTypes();

    this.startDate = new Date();
    this.startTime = new Date()
  }
onBlur(field : NgModel){
  console.log('in onBlur: ', field.valid);
}

onHttpError(errorResponse: any){
  console.log('error:', errorResponse);
  this.postError = true;
  this.postErrorMessage = errorResponse.error.errorMessage;
}
  //Submit form validation
onSubmit(form: NgForm){
  console.log('in OnSubmit: ', form.valid);

  if(form.valid){
  this.dataService.postUserSettingsForm(this.userSettings).subscribe(
    result => console.log('success', result),
    error => this.onHttpError(error)
  )
  }
  else{
    this.postError = true;
    this.postErrorMessage = "Please fix the above errors"
  }
}
}

