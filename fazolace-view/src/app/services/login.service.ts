import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http'
import { UserElement } from 'src/app/classes/UserElement.classes';

 
@Injectable()
export class LoginService {
 
  private _BaseUrl="http://13.212.88.242:8080/api/v1/users/"


  constructor(private _http:HttpClient) { }

    onLoginUser(user):Observable<any>{
        return this._http.post<any>(this._BaseUrl+"login", user)
    }

    logginUser(){
      return !! localStorage.getItem('token')
    }

    logginAdmin(){
      return !! localStorage.getItem('admintoken')
    }
    
    getToken(){
      return localStorage.getItem('admintoken')
    }
}