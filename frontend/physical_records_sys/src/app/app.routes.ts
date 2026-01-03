import { Routes } from '@angular/router';
import { RecordsListComponent } from '../components/records-list-component/records-list-component';
import { LoginComponent } from '../components/login-component/login-component';
import { RecordsAddNewComponent } from '../components/records-add-new-component/records-add-new-component';
import { roleGuard } from '../guards/role-guard';
import { RecordsEditComponent } from '../components/records-edit-component/records-edit-component';
import { RecordIndividualViewComponent } from '../components/record-individual-view-component/record-individual-view-component';

export const routes: Routes = [
    { path: '', redirectTo: 'records', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'records', component: RecordsListComponent },
    {
      path: 'records/:id',
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
    { path: '**', redirectTo: 'records' }
];
