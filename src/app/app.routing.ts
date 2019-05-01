import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { ListPatientsComponent } from './list-patients/list-patients.component';
import { AddPatientComponent } from './add-patient/add-patient.component';
import { UpdatePatientComponent } from './update-patient/update-patient.component';

const routes: Routes = [
  { path: '',  redirectTo: '/list-patients', pathMatch: 'full' },
  { path: 'list-patients', component: ListPatientsComponent },
  { path: 'add-patient', component: AddPatientComponent },
  { path: 'update-patient/:id', component: UpdatePatientComponent }
];

export const routingModule: ModuleWithProviders = RouterModule.forRoot(routes);