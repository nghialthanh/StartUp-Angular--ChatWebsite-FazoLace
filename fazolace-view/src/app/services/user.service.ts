import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';


@Injectable()
export class UserService {

    private _Url='http://13.212.88.242:8080/api/v1/users/'

    constructor(private _http:HttpClient) { }

    loadInfouser(account_name){
        return this._http.get<any>(this._Url+"getInfo/"+account_name)
    }
    updateInfo(info):Observable<any>{
        return this._http.put<any>(this._Url+"updateInfo",info);
    }
    ChangePass(account_name):Observable<any>{
        return this._http.patch<any>(this._Url+"changePassword",account_name)
    }
    getInforByList(list):Observable<any>{
        return this._http.post(this._Url+"getUserByList",list);
    }
}