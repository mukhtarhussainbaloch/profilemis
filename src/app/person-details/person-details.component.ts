import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Person} from '../model/person';
import {ActivatedRoute, Router} from '@angular/router';
import {switchMap, tap} from 'rxjs/operators';
import {PersonDataSource} from '../person-list/person-datasource';
import {PersonApiService} from '../services/person-api.service';
import {Observable} from 'rxjs';

import * as _moment from 'moment';
import {MAT_DIALOG_DATA, MatDateFormats, MatDialogRef} from '@angular/material';

const moment = _moment;


@Component({
  selector: 'app-person-details',
  templateUrl: './person-details.component.html',
  styleUrls: ['./person-details.component.css']
})
export class PersonDetailsComponent implements OnInit {
  personForm: FormGroup;
  private person: Observable<Person>;
  dataSource: PersonDataSource;
  description = 'Person details';


  constructor(private fb: FormBuilder, private route: ActivatedRoute,
              private router: Router, private personApiService: PersonApiService,
              public dialogRef: MatDialogRef<PersonDetailsComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Person
  ) {
    this.personForm = this.fb.group({
      id: [null],
      firstName: [''],
      lastName: [''],
      title: [''],
      fatherName: [''],
      domicile: [''],
      nationality: [''],
      emergencyContactNo: [''],
      dateOfBirth: [''],
      email: [''],
      gender: [''],
      religion: [''],
      cnic: [''],
      photoPath: ['']
    });
  }

  ngOnInit() {
    console.log('dialog data', this.data);
    this.personForm.patchValue(this.data);
  }

  loadPerson() {
    const personId = this.route.snapshot.paramMap.get('id');
    this.dataSource = new PersonDataSource(this.personApiService);
    this.person = this.personApiService.getPersonById(personId).pipe(
      tap(person => {
          console.log('returned person:', person);
          return this.personForm.patchValue(person);
        }
      ));
  }


  onCancle() {
    this.dialogRef.close();
  }
}
