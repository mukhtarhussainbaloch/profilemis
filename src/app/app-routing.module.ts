import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PersonListComponent} from './person-list/person-list.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {PlaceholderComponent} from './placeholder/placeholder.component';
import {LoginComponent} from './login/login.component';
import {PersonDetailsComponent} from './person-details/person-details.component';

const routes: Routes = [
  {path: 'person', component: PersonListComponent},
  {path: 'dashboard', component: DashboardComponent},
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'sales/accounts',
    component: PlaceholderComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: 'sales/leads',
    component: PlaceholderComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: 'sales/opportunities',
    component: PlaceholderComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: 'person/:id',
    component: PersonDetailsComponent
  },
  {
    path: '**',
    redirectTo: 'sales/contacts'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
