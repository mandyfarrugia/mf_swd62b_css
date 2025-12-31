import { Routes } from '@angular/router';
import { RecordsListComponent } from '../components/records-list-component/records-list-component';
import { LoginComponent } from '../components/login-component/login-component';
import { RecordsAddNewComponent } from '../components/records-add-new-component/records-add-new-component';

export const routes: Routes = [
    { path: '', redirectTo: 'records', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'records', component: RecordsListComponent },
    { path: 'records/add-new', component: RecordsAddNewComponent },
    { path: '**', redirectTo: 'records' }
];