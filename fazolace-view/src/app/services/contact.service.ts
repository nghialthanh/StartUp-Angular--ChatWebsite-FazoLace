import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'


@Injectable()
export class ContactService {

    private _Url='http://13.212.88.242:8000/'

    constructor(private _http:HttpClient) { }

    loadContactList(account_name){
        return this._http.get<any>(this._Url+"getAllContactByAccountName/"+account_name)
    }

    deleteContact(id_cl){
        return this._http.delete<any>(this._Url+"deleteContact/"+id_cl)
    }
}
