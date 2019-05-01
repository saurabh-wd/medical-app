import { Component, OnInit } from '@angular/core';
import { PatientService } from '../services/patient.service';
import { DrugService } from '../services/drug.service';
import { Router } from '@angular/router';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-list-patients',
  templateUrl: './list-patients.component.html',
  styleUrls: ['./list-patients.component.css']
})
export class ListPatientsComponent implements OnInit {

  patients: any = [];
  password: string;
  ID: any;

  selectedCheckboxIds: Array<number> = [];
  deleteModalShow: boolean = false;
  deleteMessage : string;
  currentView: string = 'list';
  patientTypes: Array<Object> = [];
  message:string = '';

  totalRecords: number = 0;
  recordPerPage: number = 1;
  pageNo: number = 1;

  sortCol: string =  'name';
  sortType: string = 'asc';
  constructor(public patientService: PatientService, public drugService: DrugService, private router: Router, private messageService: MessageService) { }

  ngOnInit() {
    this.getPatients();
  }

  getPatients() {
    this.patients = [];
    this.patientService.getPatients({pageNo:this.pageNo, recordPerPage: this.recordPerPage, sortCol: this.sortCol, sortType: this.sortType}).subscribe((response) => {
      this.patients = response.data;      
      this.totalRecords = response.summary.total;
    })
  }
  doPaginate(pageNum: number) {
    this.pageNo = pageNum;
    this.getPatients();
  }
  switchView() {
    this.currentView = this.currentView == 'list'?'grid':'list';
  }
  
  deleteOne(patient:any) {   
    this.deleteMessage = `Are you sure you want to delete the patient <strong>${patient.first_name} ${patient.last_name}</strong>`;
    this.selectedCheckboxIds = [];
    this.selectedCheckboxIds.push(patient['_id']);
    this.deleteModalShow = true;
    
  }
  bulkDelete() {
    this.deleteMessage = `Are you sure you want to delete all the selected patient(s)`;    
    this.deleteModalShow = true;
  }
  selectCheckbox(id: number, e) {
    if(e.target.checked){
      this.selectedCheckboxIds.push(id);
    } else {
      (this.selectedCheckboxIds).splice((this.selectedCheckboxIds).indexOf(id), 1);     
    }   
  }
  deleteStart() {
      this.message = '';
      this.patientService.deletePatient(this.selectedCheckboxIds).subscribe((response) => {
        this.deleteModalShow = false;
        this.selectedCheckboxIds = [];
        this.messageService.setMessage(5);
        this.message = this.messageService.showMessage();
        this.pageNo = 1;
        this.getPatients();  
      }, (err) => {
        this.messageService.setMessage(6); 
        this.message = this.messageService.showMessage();       
        console.log(err)
      }
    )  
  }

  checkAll(e) {
    if(e.target.checked){
      for(let patient of this.patients) {
        this.selectedCheckboxIds.push(patient['_id']);
        patient['checked'] = true;
      }
    } else {
        for(let patient of this.patients) {
        this.selectedCheckboxIds = [];
        patient['checked'] = false;
      }
    }
  }
  deleteConfirm() {
    this.deleteStart();
  }
  deleteCancel(patient:any) {
    this.deleteModalShow = false;
  }

  sortColumn(col:string) {
      this.sortCol = col;
      this.sortType = this.sortType == 'asc'?'desc':'asc';
      this.getPatients();
  }



  addDrug = false;
  drugs: any = [];
  selectedCheckboxDrugIds: Array<number> = [];
  drugModalShow: boolean = false;
  drugDeleteMessage : string;

  drugMessage:string = '';

  totalRecordsDrugs: number = 0;
  recordPerPageDrugs: number = 1;
  pageNoDrug: number = 1;

  sortColDrug: string =  'name';
  sortTypeDrug: string = 'asc';

getDrugs() {
    this.patients = [];
    this.drugService.getDrugs({pageNo:this.pageNoDrug, recordPerPage: this.recordPerPageDrugs, sortCol: this.sortColDrug, sortType: this.sortTypeDrug}).subscribe((response) => {
      this.drugs = response.data;      
      this.totalRecordsDrugs = response.summary.total;
    })
  }
  doPaginateDrugs(pageNum: number) {
    this.pageNo = pageNum;
    this.getDrugs();
  }
  
  deleteOneDrug(patient:any) {   
    this.deleteMessage = `Are you sure you want to delete the patient <strong>${patient.first_name} ${patient.last_name}</strong>`;
    this.selectedCheckboxIds = [];
    this.selectedCheckboxIds.push(patient['_id']);
    this.deleteModalShow = true;
    
  }
  bulkDeleteDrugs() {
    this.deleteMessage = `Are you sure you want to delete all the selected patient(s)`;    
    this.deleteModalShow = true;
  }
  selectCheckboxDrug(id: number, e) {
    if(e.target.checked){
      this.selectedCheckboxIds.push(id);
    } else {
      (this.selectedCheckboxIds).splice((this.selectedCheckboxIds).indexOf(id), 1);     
    }   
  }
  deleteStartDrug() {
      this.message = '';
      this.patientService.deletePatient(this.selectedCheckboxIds).subscribe((response) => {
        this.deleteModalShow = false;
        this.selectedCheckboxIds = [];
        this.messageService.setMessage(5);
        this.message = this.messageService.showMessage();
        this.pageNo = 1;
        this.getPatients();  
      }, (err) => {
        this.messageService.setMessage(6); 
        this.message = this.messageService.showMessage();       
        console.log(err)
      }
    )  
  }

  checkAllDrug(e) {
    if(e.target.checked){
      for(let patient of this.patients) {
        this.selectedCheckboxIds.push(patient['_id']);
        patient['checked'] = true;
      }
    } else {
        for(let patient of this.patients) {
        this.selectedCheckboxIds = [];
        patient['checked'] = false;
      }
    }
  }
  deleteConfirmDrug() {
    this.deleteStart();
  }
  deleteCancelDrug(patient:any) {
    this.deleteModalShow = false;
  }

  sortColumnDrug(col:string) {
      this.sortCol = col;
      this.sortType = this.sortType == 'asc'?'desc':'asc';
      this.getPatients();
  }
}
