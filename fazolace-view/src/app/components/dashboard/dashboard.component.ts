import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ChatSocketService } from '../../services/chat-socket.service';
import {NotifyPanelComponent} from '../../components/notification/notification.component'


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
   account_name = localStorage.getItem("acc"); 

  constructor(private chatsocket: ChatSocketService,public matSnackBar: MatSnackBar) {}
  ngOnInit(): void {
    this.chatsocket.emit('create-account_name',this.account_name);
    this.chatsocket.listen('sever-send-notifiyAccept')
    .subscribe(data=>{
      console.log(data);
      if(data["isSend"]==true){
        let temptData = '';
        temptData =  data["account_name"]+' Đồng ý kết bạn';
        this.openNotification(temptData);

      }else{
        let temptData ='';
         temptData = 'Đã là bạn bè với '+ data["account_name"];
        this.openNotification(temptData);

      }
    });
    this.chatsocket.listen('sever-send-notifiyDeny')
    .subscribe(data=>{
      if(data["isSend"]==true){
        let temptData = (data["account_name"]+'Không đồng ý kết bạn');
        this.openNotification(temptData);

      }else{
       
      }
    })
  } 
openNotification(data){
  this.matSnackBar.openFromComponent(NotifyPanelComponent,{
    data:data,
    duration:3000,
    horizontalPosition:'end',
    verticalPosition:'bottom',
    panelClass:['notify'],
  });
}

}
