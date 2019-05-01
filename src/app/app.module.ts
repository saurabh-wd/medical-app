import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { routingModule } from './app.routing';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// TODO: Add http client module

import { ModalComponent } from './modal/modal.component';
import { PaginationComponent } from './pagination/pagination.component';
import { MessageService } from './services/message.service';

import { AppComponent } from './app.component';
import { AddPatientComponent } from './add-patient/add-patient.component';
import { ListPatientsComponent } from './list-patients/list-patients.component';
import { UpdatePatientComponent } from './update-patient/update-patient.component';

@NgModule({
  declarations: [
    AppComponent,
    AddPatientComponent,
    ListPatientsComponent,
    UpdatePatientComponent,
    ModalComponent,
    PaginationComponent
  ],
  imports: [
    BrowserModule,
    routingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
