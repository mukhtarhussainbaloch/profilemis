import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Person} from '../model/person';
import {map} from 'rxjs/operators';
import {Moment} from 'moment';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class PersonApiService {

  personApiUrl = 'http://localhost:8080/people';

  constructor(private httpClient: HttpClient) {
  }

  savePerson(person: Person) {
    return this.httpClient.post(this.personApiUrl, person);
  }

  updatePerson(person: Person) {
    moment.fn.toJSON = function() {
      return this.utc(true).format();
    };

    return this.httpClient.put(this.personApiUrl + '/' + person.id, person);
    // .subscribe((value => console.log('person updated with following details', value)),
    //   error1 => console.error('Error updating the person', error1));
  }

  getPersonById(id: string) {
    console.log(this.personApiUrl + '/' + id);
    return this.httpClient.get(this.personApiUrl + '/' + id)
      .pipe(
        map((res: any) => {
          console.log('data', res);
          return res;
        })
      );
  }

  getAllPerson(filter = '', sortOrder = 'asc',
               pageNumber = 0, pageSize = 20): Observable<Person[]> {
    return this.httpClient.get(this.personApiUrl,
      {
        params: new HttpParams()
        // .set('filter', filter)
        // .set('sortOrder', sortOrder)
          .set('page', pageNumber.toString())
          .set('size', pageSize.toString())
      })
      .pipe(
        map((res: any) => res['content'])
      );

  }
}
