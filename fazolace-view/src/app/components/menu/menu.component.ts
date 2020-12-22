import { Component, OnInit } from '@angular/core';
import { faComments } from '@fortawesome/free-regular-svg-icons';
import { faAddressBook } from '@fortawesome/free-regular-svg-icons';
import { faBell } from '@fortawesome/free-regular-svg-icons';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { faAddressCard } from '@fortawesome/free-solid-svg-icons';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { UpdateinfoComponent } from '../updateinfo/updateinfo.component';
import { ChangePasswordComponent } from '../menu/change-pass/change-pass.component';
import {Router, ROUTES} from '@angular/router'
import {SharedDataService} from "src/app/services/sharedataservice.service"
import {ChatSocketService} from '../../services/chat-socket.service'
import {UserService} from "src/app/services/user.service"
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotifyPanelComponent} from '../notification/notification.component'
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  url="https://bucketchats.s3-ap-southeast-1.amazonaws.com/";
  faac = faAddressCard;
  fas = faSignOutAlt;
  fac = faComments;
  faad = faAddressBook;
  fabe = faBell;
  faco = faCog;
  index = 0;
  user_name = "";
  account_name = "";
  role = ""
  user_image = "";
  user_phone = '';
  user_gender = "";
  user_date = "";
  user_email = "";
  image
  


  constructor(
    private _userService:UserService,
    public dialog: MatDialog,
    private router:Router,
    private _data:SharedDataService,
    private chatSocket: ChatSocketService,
    public matSnackBar: MatSnackBar
    
    ) { }


  openDialog(): void {
    const dialogRef = this.dialog.open(UpdateinfoComponent, {
      width: '380px',
      height: '516.5px',
      data: {
        user_name: this.user_name,
        account_name: this.account_name,
        role: this.role,
        user_image: this.user_image,
        user_phone: this.user_phone,
        user_gender: this.user_gender,
        user_date: this.user_date,
        user_email: this.user_email
      }
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }


  openDialogMK(): void {
    const dialogRef = this.dialog.open(ChangePasswordComponent, {
      width: '400px'
      
    });
  }
  ngOnInit(): void {
    if(localStorage.getItem("image")!='defaul'){
      this.image = this.url+localStorage.getItem('image');
    }
    else {
      this.image='/../../assets/iconfinder-8-avatar-2754583_120515.png'
    }
    this.chatSocket.listen('recive_invatation_friend')
    .subscribe(async data=>{  
      if(data["isSend"] == true){
        this.index+=1;
        let temptData = '';
        temptData='Bạn đã Nhận được lời mời kết bạn';
        this.openNotification(temptData);
      }else{
        let temptData ='';
        temptData= 'Bạn đã gửi lời mời kết bạn';
         this.openNotification(temptData)
      }
    });   
    this._data.currentcount.subscribe(
      res=>this.index=res,
      err=>err
    )
  }

  LogOutClick(){
    localStorage.clear();
    this.router.navigate(['login']);
  }

  changeViewtoMes(){
    this._data.changeView("List Message")
  }

  changeViewtoListFriends(){
    this._data.changeView("List Friend")
  }

  changeViewtoAccepFriend(){    
    this._data.changeView("Accep Friend");
    this.index = 0;
    //this._data.ChangeCounts(0)
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
