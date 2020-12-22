
import { Component, OnInit, ViewChild,AfterViewInit,ElementRef} from '@angular/core';
import { faComment } from '@fortawesome/free-regular-svg-icons';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { faPlusSquare } from '@fortawesome/free-regular-svg-icons';
import {FriendService} from "src/app/services/friend.service"
import {FormsModule} from "@angular/forms"
import {ChatSocketService } from '../../../services/chat-socket.service'

@Component({
  selector: 'app-dialogadd',
  templateUrl: './dialogadd.component.html',
  styleUrls: ['./dialogadd.component.scss']
})
export class DialogaddComponent implements OnInit {
  url="/../../assets/iconfinder-8-avatar-2754583_120515.png"
  action="";
  fant =faComment;
  fakb = faPlusSquare;
  fax = faTrashAlt;
  ktr= true;
  info={
    user_email:'',
    user_name:'',
    user_phone:'',
    user_gender:'',
    user_date:'',
    user_image:'',
    status:'Kết bạn'
  }
  fl_id
  infoSearch={
    infoInput:'',
    infoAcc:localStorage.getItem("acc")
  }
  account_name;

  constructor(
    private _http:FriendService,
    private chatSocket:ChatSocketService ) { }

  ngOnInit(): void {
    this.chatSocket.listen('sever-send-notification')
    .subscribe((data=>{
      console.log(data);
    }))
  }


  search(){ 
    this._http.findFriend(this.infoSearch).subscribe(
      res=>{
        if(res.messages==='' || res.messages==null ){
          document.getElementById("Viewinfo").style.display = 'inline';
          document.getElementById("header").style.display="none";
          document.getElementById("title").style.display="none";
          this.url="https://bucketchats.s3-ap-southeast-1.amazonaws.com/"+res.dataFriend[0].user_image
          this.info.user_phone=res.dataFriend[0].user_phone
          this.info.user_date=res.dataFriend[0].user_date
          this.info.user_gender=res.dataFriend[0].user_gender
          this.info.user_name=res.dataFriend[0].user_name
          this.account_name=res.dataFriend[0].account_name
          if(res.messages== "is not friend"){
            this.action="Kết bạn"
          }
          else if(res.row[0].fl_status=="accepted"){
            this.fl_id=res.row[0].fl_id;
            this.action="Hủy kết bạn"
          }  
          else if(res.row[0].req_friend==this.infoSearch.infoAcc){
            this.fl_id=res.row[0].fl_id;
            this.action="Hủy lời mời"
          } 
          else if(res.row[0].friend==this.infoSearch.infoAcc){
            this.fl_id=res.row[0].fl_id;
            this.action="Chấp nhận kết bạn"
          }
        }
        else
          alert("Không tìm thấy");
      },
      err=>console.log(err)
    )
  }  

  sendReq(){
    var send={
      friend:this.account_name,
      req_friend:localStorage.getItem("acc"),
    }
    
    if(this.action=="Kết bạn"){
      this._http.sendReq(send).subscribe(
        res=>{
            this.action="Hủy lời mời"
            this.ktr=false;
            this.chatSocket.emit('send-req',{req_friend:send.req_friend,friend:send.friend});
          },
        err=>err,
      ) 
    }
    else if(this.action=="Hủy kết bạn" || this.action=="Hủy lời mời"){
      this._http.unOrdenyFriend(this.fl_id).subscribe(
        res=>{
          this.action='Kết bạn'
          this.ktr=false;
        },
        err=>err
      )
    }
    else if(this.action=="Chấp nhận kết bạn"){
      this._http.acceptFriend(this.fl_id).subscribe(
        res=>{
          this.action='Hủy kết bạn'
          this.ktr=false;
        },
        err=>err
      )
    } 
  }
}

  // @ViewChild('ten') ten: ElementRef;

  // ngAfterViewInit() {
  //   this.ten.nativeElement.textContent = this.name;
  // }
