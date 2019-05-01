import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { MessageService } from '../services/message.service';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { PatientService } from '../services/patient.service';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.css']
})
export class AddPatientComponent implements OnInit {

 // newPatient: Patients = new Patients();
    newPatient: any;
    message: string;
    constructor(
        private eventService: PatientService,
        private router: Router,
        private http: HttpClient,
        private messageService: MessageService
    ) {}

    ngOnInit() {
         
    }

    patientsForm = new FormGroup({
        first_name: new FormControl('', [Validators.required], this.duplicatePatientCheck.bind(this) ),
        last_name: new FormControl('', [Validators.required]),
        age: new FormControl('', [Validators.required]),
        gender: new FormControl('', [Validators.required]),
        address: new FormControl('', [Validators.required]),
        phone: new FormControl('', [Validators.required]),
        consulted_by: new FormControl('', [Validators.required]),
        complaints: new FormControl('', [Validators.required]),
        results: new FormControl(''),
        drugs: new FormControl('')
    });

    addPatient() {
      console.log('this.patientsForm', this.patientsForm.valid, this.patientsForm)
        if(!this.patientsForm.valid) {
            return false;
        }       
        this.newPatient = this.patientsForm.value;               
        this.eventService.addPatient(this.newPatient).subscribe(response => {
            this.messageService.setMessage(3);
            this.router.navigate(['/list-patients']);
        }, (err) => {
            this.messageService.setMessage(4);
            this.message = this.messageService.showMessage();           
            //console.log(err)
        }
        );

        /*this.eventService.addPatient(this.newPatient).subscribe((response) => {
      this.router.navigate(['/list-patients']);
    });*/
    }
    duplicatePatientCheck(control: AbstractControl) {
    
        if(this.patientsForm && !this.patientsForm.dirty) {
            const q1 = new Promise((resolve, reject) => {
                resolve(null);
            });
            return q1;
        } else if(this.patientsForm) {
           const matchingControl = this.patientsForm.controls['name'];   
          const q = new Promise((resolve, reject) => {
            setTimeout(() => {             
             // matchingControl.setErrors({ 'duplicateName': true });
                             /////matchingControl.setErrors({ 'duplicateName': false });                            
                  //resolve({ 'duplicateName': true });
                  resolve(null)    
              this.eventService.checkDuplicate(control.value, this.patientsForm.value.id).subscribe((response) => {                 
                if(response.data.count > 0){ 
                  matchingControl.setErrors({ 'duplicateName': true });
                  resolve({ 'duplicateName': true });
                } else {resolve(null)}
              });
            }, 1000);
          });
          return q;
        }    
    }
}
