import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { ApiService } from './api.service';
import { environment } from 'src/environments/environment';
//import { Patient } from './../model/patient';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class DrugService {

  constructor(private http: HttpClient, private apiService: ApiService) { }

  private extractData(res: any) {
    let body = res;
    return body || {};
  }

 getDrugs(postObj): Observable<any> {
    return this.apiService.post(environment.BASE_HREF+'drug-list', postObj);
  }

  getDrug(id): Observable<any> {
   return this.apiService.get(environment.BASE_HREF+'drug/'+id);
  }

  addDrug(drug): Observable<any> {    
    return this.apiService.post(environment.BASE_HREF+'drug/', drug);
  }

  updateDrug(drug: any): Observable<any> {
    let data: any = drug; 
    let _id = data.id;
    delete data.id;
    data._id = _id;

    return this.apiService.put(environment.BASE_HREF+'drug/', data);
  }

  deleteDrug(drug): Observable<any> {
    return this.apiService.delete(environment.BASE_HREF+'drug/', drug);
  }
  checkDuplicateDrug(name: string, id?:number): any {
    return this.apiService.post(environment.BASE_HREF+'check-duplicate-drug', {name:name, id:id});
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    }
  }
}
