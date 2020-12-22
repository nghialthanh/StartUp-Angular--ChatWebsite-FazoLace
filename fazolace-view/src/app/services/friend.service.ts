import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { __param } from 'tslib';
import { isParameter } from 'typescript';
import { Observable } from 'rxjs';

@Injectable()
export class FriendService {
    private _Url = 'http://13.212.88.242:8080/api/v1/contacts/'


    constructor(private _http: HttpClient) { }


    loadListfriend(account_name): Observable<any> {
        return this._http.get<any>(this._Url + "getAllFriend/" + account_name)
    }

    findFriend(infoSearch): Observable<any> {
        return this._http.post<any>(this._Url + "findFriend", infoSearch)
    }

    sendReq(send): Observable<any> {
        return this._http.post<any>(this._Url + "addFried", send)
    }

    getAllreqfriend(account_name): Observable<any> {
        return this._http.get<any>(this._Url + "getAllFriendPending/" + account_name)
    }

    acceptFriend(friend): Observable<any> {
        return this._http.patch<any>(this._Url + "acceptFriend/", friend);
    }


    unOrdenyFriend(friend): Observable<any> {
        return this._http.post<any>(this._Url + "deleteFriend/", friend)
    }


}