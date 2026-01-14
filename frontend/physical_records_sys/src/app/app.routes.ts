import { Routes } from '@angular/router';
import { RecordsListComponent } from '../components/records-list-component/records-list-component';
import { LoginComponent } from '../components/login-component/login-component';
import { RecordsAddNewComponent } from '../components/records-add-new-component/records-add-new-component';
import { roleGuard } from '../guards/role-guard';
import { RecordsEditComponent } from '../components/records-edit-component/records-edit-component';
import { RecordIndividualViewComponent } from '../components/record-individual-view-component/record-individual-view-component';
import { NotFoundComponent } from '../components/not-found-component/not-found-component';

export const routes: Routes = [
    { path: '', redirectTo: 'records', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    {
      path: 'records',
      component: RecordsListComponent,
      canActivate: [roleGuard],
      data: { roles: ['clerk', 'manager', 'admin'] }
    },
    {
      path: 'records/view/:id',
      component: RecordIndividualViewComponent,
      canActivate: [roleGuard],
      data: { roles: ['clerk', 'manager', 'admin'] }
    },
    {
      path: 'records/add-new',
      component: RecordsAddNewComponent,
      canActivate: [roleGuard],
      data: { roles: ['clerk', 'manager', 'admin'] }
    },
    {
      path: 'records/edit/:id',
      component: RecordsEditComponent,
      canActivate: [roleGuard],
      data: { roles: ['manager', 'admin'] }
    },
    { path: 'error-404-not-found', component: NotFoundComponent },
    { path: '**', component: NotFoundComponent, pathMatch: 'full' }
];
