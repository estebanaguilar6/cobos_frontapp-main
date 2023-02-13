import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserCobosService {
  private fullName$ = new BehaviorSubject<string>("");
  private role$ = new BehaviorSubject<string>("");
  readonly inspectionAPIUrl = "https://localhost:7088/api/GetAllUsersRendsView/"

  constructor(private http:HttpClient) { }
  
    public getRoleFromStore(){
      return this.role$.asObservable();
    }

    public setRoleForStore(role:string){
      this.role$.next(role);
    }

    public getFullNameFromStore(){
      return this.fullName$.asObservable();
    }

    public setFullNameFromStore(fullName:string){
      this.fullName$.next(fullName);
    }
    
    public getUserRendsList() {
      return this.http.get<any>(this.inspectionAPIUrl);
    }
    
}
