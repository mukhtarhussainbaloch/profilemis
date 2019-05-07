import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

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
  MatDialogRef, MatDatepickerModule,
  MatNativeDateModule, MatRadioModule
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
    MatNativeDateModule,
    MatRadioModule
  ],
  providers: [],
  entryComponents: [PersonDetailsComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
