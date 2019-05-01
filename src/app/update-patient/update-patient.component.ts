import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators, AbstractControl, NG_ASYNC_VALIDATORS, Validator, ValidationErrors } from '@angular/forms';
import { MessageService } from '../services/message.service';
import { PatientService } from '../services/patient.service';
//import { DuplicateChecker } from '../services/duplicate-check';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-patient',
  templateUrl: './update-patient.component.html',
  styleUrls: ['./update-patient.component.css']
})
export class UpdatePatientComponent implements OnInit {

  id: any; 
  message: string = '';
  constructor(private route: ActivatedRoute, private patientService: PatientService, private router: Router, private messageService: MessageService) { 
    this.route.params.subscribe(params => this.id = params['id']);
  }

  patientsForm = new FormGroup({
      id: new FormControl('', [Validators.required]),
      name: new FormGroup({
        first_name: new FormControl('', [Validators.required]),
        last_name: new FormControl('', [Validators.required])
      }),
      
      age: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      consulted_by: new FormControl('', [Validators.required]),
      complaints: new FormControl('', [Validators.required]),
      results: new FormControl(''),
      drugs: new FormControl('')
  });
  ngOnInit() {
    if (this.id) {
      this.patientService.getPatient(this.id).subscribe(response => { this.setupEditData(response); }, (err) => {
        this.messageService.setMessage(7);
      });
    }
  }

  
  setupEditData(formData: any) {
    let newPatient = { 
      id: formData._id, 
      name: {first_name: formData.first_name, last_name: formData.last_name }, 
      age: formData.age, 
      gender: formData.gender,
      address: formData.address,
      phone: formData.phone,
      consulted_by: formData.consulted_by,
      complaints: formData.complaints,
      results: formData.results,
      drugs: formData.drugs
    };
    this.patientsForm.setValue(newPatient);
    console.log('this.patientsForm', this.patientsForm)
  }

  updatePatient() {
    console.log('this.patientsForm', this.patientsForm)
    if(!this.patientsForm.valid) {
            return false;
    }
    let newPatient = this.patientsForm.value;    
    newPatient['first_name'] = newPatient.name['first_name'];
    newPatient['last_name'] = newPatient.name['last_name'];
    delete(newPatient.name);
    console.log('p', newPatient)    
    this.patientService.updatePatient(newPatient).subscribe(response => {
        this.messageService.setMessage(1);
        this.router.navigate(['/list-patients']);
    }, (err) => {
      this.messageService.setMessage(4);
      this.message = this.messageService.showMessage();
      }
    );   
  }







  duplicatePatientCheck(control: AbstractControl): Promise<any> {
      if(this.patientsForm && !this.patientsForm.dirty) {
          const q1 = new Promise((resolve, reject) => {
              resolve(null);
          });
          return q1;
      } else if(this.patientsForm) { 
          const q = new Promise((resolve, reject) => {            
          setTimeout(() => {
            this.patientService.checkDuplicate(control.value, this.patientsForm.value.id).subscribe((response) => { 
              console.log(response.data);                
              if(response.data.count > 0){                
                resolve({ 'duplicateName': true });
               } else {resolve(null);}
            }, (error) => {
              resolve({ 'duplicateName': true });
            });
          }, 1000);
        });
        return q;
      } 
    };
}