import {Component} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import * as moment from 'moment';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material';
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
   ,
  ],
})
export class AppComponent {
  title = 'personapiclient';

  myFormGroup = this.fb.group({
    dateOfBirth: [moment()]
  });

  constructor(private fb: FormBuilder) {
  }
}
