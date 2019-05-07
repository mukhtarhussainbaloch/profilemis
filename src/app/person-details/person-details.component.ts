import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Person} from '../model/person';
import {ActivatedRoute, Router} from '@angular/router';
import {switchMap, tap} from 'rxjs/operators';
import {PersonDataSource} from '../person-list/person-datasource';
import {PersonApiService} from '../services/person-api.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-person-details',
  templateUrl: './person-details.component.html',
  styleUrls: ['./person-details.component.css']
})
export class PersonDetailsComponent implements OnInit {

  personForm = this.fb.group({
    $key: [null],
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
  private person: Observable<Person>;
  dataSource: PersonDataSource;


  constructor(private fb: FormBuilder, private route: ActivatedRoute,
              private router: Router, private personApiService: PersonApiService,
  ) {
  }

  ngOnInit() {
    console.log('ng init working for me');
    const personId = this.route.snapshot.paramMap.get('id');
    this.dataSource = new PersonDataSource(this.personApiService);
    this.person = this.personApiService.getPersonById(personId).pipe(
      tap(person => {
          console.log('returned person:', person);
          return this.personForm.patchValue(person);
        }
      ));
    // this.dataSource.loadPersonDataById(personId);
  }

  savePerson(person: Person) {
    this.personApiService.savePerson(person);
    console.log('saving .. ', person);
  }
}
