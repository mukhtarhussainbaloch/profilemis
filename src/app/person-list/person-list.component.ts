import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatDialogConfig, MatPaginator, MatSort} from '@angular/material';
import {PersonDataSource} from './person-datasource';
import {PersonApiService} from '../services/person-api.service';
import {Person} from '../model/person';
import {fromEvent, merge} from 'rxjs';
import {debounceTime, distinctUntilChanged, tap} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';
import {PersonDetailsComponent} from '../person-details/person-details.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css']
})
export class PersonListComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  searchKey: string;
  dataSource: PersonDataSource;
  person: Person;
  selectedPerson: Person;

  @ViewChild('input') input: ElementRef;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'cnic', 'title', 'firstName', 'lastName', 'fatherName', 'dateOfBirth', 'gender', 'actions'];

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

  constructor(private route: ActivatedRoute,
              private personApiService: PersonApiService,
              private dialog: MatDialog) {

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
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = this.selectedPerson;
    dialogConfig.width = '60%';

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    const matDialogRef = this.dialog.open(PersonDetailsComponent, dialogConfig);

    // const dialogRef = this.dialog.open(PersonDetailsComponent, {
    //   width: '60%',
    //   data: this.selectedPerson,
    // });

    matDialogRef.afterClosed().subscribe(result => {
      this.person = result;
      this.personApiService.updatePerson(this.person).subscribe(value => {
      }, error1 => console.log('Error saving data ', error1));
    });
  }

  onCreateNew() {
    const dialogRef = this.dialog.open(PersonDetailsComponent, {
      width: '60%',
      // data: {person: new Person()}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.person = result;
      this.personApiService.savePerson(this.person).subscribe(value => {
        console.log('Resut of object save', value);
      }, error1 => console.log('Error saving data ', error1));
    });

  }

}
