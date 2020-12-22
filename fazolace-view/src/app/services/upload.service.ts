import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private httpClient: HttpClient) { }
  fileUpLoad(file:FormData){
    return this.httpClient.post('http://13.212.88.242:8080/api/v1/chats/upload',file);
  }
}
