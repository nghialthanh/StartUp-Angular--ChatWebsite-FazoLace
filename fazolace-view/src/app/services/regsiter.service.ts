import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
 
@Injectable()
export class RegsiterService {
 
  private _BaseUrl="http://13.212.88.242:8080/api/v1/users/"
    
  constructor(private _http:HttpClient) { }
    

    onRegsiter(user):Observable<any>{
        return this._http.post<any>(this._BaseUrl+"sendOTP", user)
    }

    onRegsiterConfirm(user):Observable<any>{
      return this._http.post<any>(this._BaseUrl+"verifyOTP",user)
    }

    onUpdateuser(user):Observable<any>{
      return this._http.put<any>(this._BaseUrl+"updateInfoResigter",user)
    }
}