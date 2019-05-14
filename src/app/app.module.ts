import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgMatSearchBarModule} from 'ng-mat-search-bar';

import {
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
  MAT_MOMENT_DATE_FORMATS,
  MatMomentDateModule,
  MomentDateAdapter
} from '@angular/material-moment-adapter';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {MyHttpLogInterceptor} from './http.interceptor';


import {
  MatButtonModule,
  MatCheckboxModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatCardModule,
  MatGridListModule,
  MatMenuModule,
  MatSidenavModule,
  MatListModule,
  MatProgressSpinnerModule,
  MatFormFieldModule,
  MatInputModule, MatSelectModule,
  MatDialogModule,
  MatDatepickerModule,
  MatRadioModule, DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS
} from '@angular/material';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {PersonListComponent} from './person-list/person-list.component';
import {HttpClientModule} from '@angular/common/http';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {DashboardComponent} from './dashboard/dashboard.component';
import {LayoutModule} from '@angular/cdk/layout';
import {NavComponent} from './nav/nav.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {NavigationBarComponent} from './navigation-bar/navigation-bar.component';
import {LoginComponent} from './login/login.component';
import {PlaceholderComponent} from './placeholder/placeholder.component';
import {PersonDetailsComponent} from './person-details/person-details.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    PersonListComponent,
    DashboardComponent,
    NavComponent,
    NavigationBarComponent,
    LoginComponent,
    PlaceholderComponent,
    PersonDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    HttpClientModule,
    MatIconModule,
    MatCardModule,
    MatToolbarModule,
    MatGridListModule,
    MatMenuModule,
    LayoutModule,
    MatSidenavModule,
    MatListModule,
    FlexLayoutModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatDialogModule,
    FormsModule,
    MatDatepickerModule,
    MatRadioModule,
    MatMomentDateModule,
    NgMatSearchBarModule,
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'ur'},
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    // { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true }},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
    {provide: HTTP_INTERCEPTORS, useClass: MyHttpLogInterceptor, multi: true},

  ],
  entryComponents: [PersonDetailsComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
