import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Person} from '../model/person';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {PersonApiService} from '../services/person-api.service';
import {catchError, finalize} from 'rxjs/operators';
import {Page, PagedPerson} from '../model/paged-person';

export class PersonDataSource implements DataSource<Person> {

  private personSubject = new BehaviorSubject<Person[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private personPageInfo = new BehaviorSubject<Page>(undefined);
  private singlePersonSubject = new BehaviorSubject<Person>(new Person());

  public loading$ = this.loadingSubject.asObservable();
  public pageInfo$ = this.personPageInfo.asObservable();

  constructor(private apiService: PersonApiService) {
  }

  connect(collectionViewer: CollectionViewer): Observable<Person[] | ReadonlyArray<Person>> {
    return this.personSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {

    this.personSubject.complete();
    this.loadingSubject.complete();
    this.singlePersonSubject.complete();
  }

  loadPersonData(filter: string,
                 sortDirection: string, pageIndex: number, pageSize: number) {
    this.loadingSubject.next(true);
    this.apiService.getAllPerson(filter, sortDirection, pageIndex, pageSize)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      ).subscribe(
      personList => {
        this.personSubject.next((personList as PagedPerson).person);
        this.personPageInfo.next((personList as PagedPerson).pageInfo);
      }
    );

  }

  loadPersonDataById(personId: string) {
    this.loadingSubject.next(true);
    this.apiService.getPersonById(personId)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      ).subscribe(personData => this.singlePersonSubject.next(personData));
  }


}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
