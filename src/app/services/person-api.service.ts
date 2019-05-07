import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Person} from '../model/person';
import {map} from 'rxjs/operators';

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

  getPersonById(id: string) {
    console.log(this.personApiUrl + '/' + id);
    return this.httpClient.get(this.personApiUrl + '/' + id)
      .pipe(
        map((res: any) => {
          console.log('data', res);
          return res;
        })
      );
    console.log('I am being called', this.personApiUrl + '/' + id);
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
