import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { ApiService } from './api.service';
import { environment } from 'src/environments/environment';
import { Patient } from './../model/patient';


const endpoint = "http://localhost:5000/patients";
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private http: HttpClient, private apiService: ApiService) { }

  private extractData(res: any) {
    let body = res;
    return body || {};
  }

 getPatients(postObj): Observable<any> {
    return this.apiService.post(environment.BASE_HREF+'list', postObj);
  }

  getPatient(id): Observable<any> {
   return this.apiService.get(environment.BASE_HREF+id);
  }

  addPatient(patient): Observable<any> {    
    return this.apiService.post(environment.BASE_HREF, patient);
  }

  updatePatient(patient: Patient): Observable<any> {
    let patientData: any = patient; 
    let _id = patientData.id;
    delete patientData.id;
    patientData._id = _id;

    return this.apiService.put(environment.BASE_HREF, patientData);
  }

  deletePatient(patient): Observable<any> {
    return this.apiService.delete(environment.BASE_HREF, patient);
  }
  checkDuplicate(name: string, id?:number): any {
    return this.apiService.post(environment.BASE_HREF+'check-duplicate', {name:name, id:id});
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    }
  }
}
