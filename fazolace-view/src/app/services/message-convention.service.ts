import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class MessageConventionService {

  private _Url = 'http://13.212.88.242:8080/api/v1/chats/'

  constructor(private _http:HttpClient) { }

  getAllMessage(convention):Observable<any>{          
    return this._http.post<any>(this._Url+"getAllMessage",convention);
  }
  getAllMessageVer2(convention){      
    return this._http.post<any>(this._Url+"getAllMessageVer2",convention);
  }
  addMessage(data){
    return this._http.post<any>(this._Url+'addNewMessageFile',data);
  }
  getAllConvention(acc):Observable<any>{
    return this._http.post<any>(this._Url+"getAllConvention",acc)
  }
  addConventionn(convention){
    return this._http.post<any>(this._Url+"addConvention",convention);
  }
  updateConvention(convention){
    return this._http.patch(this._Url+'updateMember',convention);
  }
  uploadFile(file:FormData){
    return this._http.post(this._Url+"uploadFile",file);
  }
}
