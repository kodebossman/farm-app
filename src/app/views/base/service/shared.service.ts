import { Injectable } from '@angular/core';
import {HttpClientModule,HttpClient,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators'
const httpOptions = {
headers :new HttpHeaders({
  'Content-Type': 'application/json'
})
}

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  apiUrl:string = 'http://localhost:3000';

  constructor(private http:HttpClient) { }

  getFarmersList():Observable<any[]>{
    return this.http.get<any>(this.apiUrl+'/farmers/all');
  }

  addFarmer(val:any){
    return this.http.post(this.apiUrl+'/farmers/create',val);
  }

  updateFarmer(val:any){
    return this.http.patch(this.apiUrl+'/edit/farmer/'+val.id,val);
  }

  deleteFarmer(val:any){
    return this.http.delete(this.apiUrl+'/farmers/delete/'+val);
  }


  getContractForms():Observable<any[]>{
    return this.http.get<any>(this.apiUrl+'/contract-forms/all');
  }

  addContractForms(val:any){
    return this.http.post(this.apiUrl+'/contract-forms/create',val);
  }

  updateContractForms(val:any){
    return this.http.put(this.apiUrl+'/contract-forms'+val.id,val);
  }

  deleteContractForms(val:any){
    return this.http.delete(this.apiUrl+'/contract-forms/'+val);
  }

  getFarms():Observable<any[]>{
    return this.http.get<any>(this.apiUrl+'/farms/all');
  }

  addFarms(val:any){
    return this.http.post(this.apiUrl+'/farms/create',val);
  }

  updateFarm(val:any){
    return this.http.put(this.apiUrl+'/farms'+val.id,val);
  }

  deleteFarm(val:any){
    return this.http.delete(this.apiUrl+'/farms/'+val);
  }

  // UploadPhoto(val:any){
  //   return this.http.post(this.apiUrl+'/Employee/SaveFile',val);
  // }

  // getAllDepartmentNames():Observable<any[]>{
  //   return this.http.get<any[]>(this.APIUrl+'/Employee/GetAllDepartmentNames');
  // }
}
