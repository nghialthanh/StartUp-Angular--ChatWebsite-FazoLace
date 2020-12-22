import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { UserElement } from 'src/app/classes/UserElement.classes';
 
@Injectable()
export class AdminService {
 
    private _Url='http://13.212.88.242:8080/api/v1/users/'


  constructor(private _http:HttpClient) { }
    

    onAdminGetAllUser():Observable<UserElement[]>{
        return this._http.get<UserElement[]>(this._Url+'getAll')
    }

    onAdminResigterUser(user):Observable<any>{
        return this._http.post<any>(this._Url+'adminAdd',user)
    }

    onChangeStatus(ac1):Observable<any>{
        return this._http.patch<any>(this._Url+"BanAccount",ac1)
    }

    onAdmindelete(account_name):Observable<any>{
        const options = {
            headers: new HttpHeaders({
              'Content-Type': 'application/json'
            }),
            body: {
              account_name: account_name,
            }
          }
        return this._http.delete<any>(this._Url+"deleteAccount",options)
    }
}