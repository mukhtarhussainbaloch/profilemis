import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort} from '@angular/material';
import {PersonDataSource} from './person-datasource';
import {PersonApiService} from '../services/person-api.service';
import {Person} from '../model/person';
import {fromEvent, merge} from 'rxjs';
import {debounceTime, distinctUntilChanged, tap} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';
import {PersonDetailsComponent} from '../person-details/person-details.component';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css']
})
export class PersonListComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: PersonDataSource;
  person: Person;
  selectedPerson: Person;
  @ViewChild('input') input: ElementRef;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'cnic', 'title', 'firstName', 'lastName', 'fatherName', 'dateOfBirth', 'gender', 'edit'];

  ngOnInit(): void {


    this.person = this.route.snapshot.data['content'];
    this.dataSource = new PersonDataSource(this.personApiService);
    this.dataSource.loadPersonData('', 'asc', 0, 20);

  }

  ngAfterViewInit(): void {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;

          this.loadPersonPage();
        })
      )
      .subscribe();

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => this.loadPersonPage())
      )
      .subscribe();
  }

  constructor(private route: ActivatedRoute, private personApiService: PersonApiService) {

  }

  loadPersonPage() {
    this.dataSource.loadPersonData(
      this.input.nativeElement.value,
      this.sort.direction,
      this.paginator.pageIndex,
      this.paginator.pageSize);
  }

  onRowClicked(person: Person) {
    this.selectedPerson = person;
    console.log('row clicked:' , person);
    // const dialogRef = this.dialog.open(PersonDetailsComponent, {
    //   width: '500px',
    //   //data: {name: this.name, animal: this.animal}
    // });
    //
    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    //   //this.animal = result;
    // });
  }
}
