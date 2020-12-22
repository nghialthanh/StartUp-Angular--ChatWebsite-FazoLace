import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { faPhoneAlt } from '@fortawesome/free-solid-svg-icons';
import { faCompressAlt } from '@fortawesome/free-solid-svg-icons';
import { faSmile } from '@fortawesome/free-regular-svg-icons';
import { faImages } from '@fortawesome/free-regular-svg-icons';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { UserService } from "src/app/services/user.service"
import { SharedDataService } from 'src/app/services/sharedataservice.service'
import { SendInfortoChatBoxService } from 'src/app/services/send-inforto-chat-box.service';
import { ChatSocketService } from 'src/app/services/chat-socket.service';
import { MessageConventionService } from 'src/app/services/message-convention.service';
//emoji
import { NotifyPanelComponent } from '../notification/notification.component';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.scss']
})
export class ChatBoxComponent implements OnInit {

  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  relationship = 'Người Lạ'
  url = '/../../assets/iconfinder-8-avatar-2754583_120515.png'
  userName = '';
  userImage = '';
  account_name = '';
  User
  fa = faPhoneAlt;
  fasm = faSmile;
  fai = faImages;
  fal = faLink;
  fapp = faPaperPlane;
  ktr = true;
  socket;
  message: string;
  listMess = [];
  listMessRoom = [];
  listFr = [];
  inforUser: any = {};
  myAccount = '';
  fileObj: File;
  fileUrl: string;
  avartar;
  checkRoom = false;
  checkPrivate = false;
  inforRoom;
  myImage = '';
  memberOfRoom = [];
  conventionID ='';
  typing= false;
  typingRoom=false;
  //emoji
  sets = [
    'native',
    'google',
    'twitter',
    'facebook',
    'emojione',
    'apple',
    'messenger'
  ]
  set = 'facebook';
  showEmojiPicker = false;
  //end emoji
  readonly urlS3 = 'https://bucketchats.s3-ap-southeast-1.amazonaws.com/';
  constructor(
    private data: SharedDataService,
    private apiUser: UserService,
    private sendData: SendInfortoChatBoxService,
    private socketChat: ChatSocketService,
    private messageService: MessageConventionService,
    private matSnackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.scrollToBottom();

    this.account_name = localStorage.getItem('acc');
    this.myImage = localStorage.getItem('image');
    this.avartar = 'https://bucketchats.s3-ap-southeast-1.amazonaws.com/' + localStorage.getItem('image');
    this.myAccount = localStorage.getItem('acc');
    this.apiUser.loadInfouser(localStorage.getItem("friendAcc")).subscribe(
      res => this.User = res,
      err => err
    );
    this.sendData.currentUser.subscribe((result) => {
      if(result.user_name !=null || result.user_name == 'undefined'){
      this.checkRoom = false;
        this.userName = result.user_name;
        this.userImage = result.user_image;
        this.account_name = result.account_name;
        if (this.userImage != undefined) {
          this.url = 'https://bucketchats.s3-ap-southeast-1.amazonaws.com/' + this.userImage
          this.relationship = 'Bạn Bè'
        }
      }    
    })
    this.sendData.currentRoom.subscribe((result) => {
      if (result.inforRoom != null || result.inforRoom == 'undefined') {
        this.checkRoom =true;
        this.memberOfRoom = result.members;
        // this.inforRoom = result.inforRoom;
        this.userName = result.inforRoom.conventionName;
        this.userImage = result.inforRoom.conventionImage;
        this.conventionID =result.inforRoom.conventionID;
        if (this.userImage != undefined) {
          this.url = 'https://bucketchats.s3-ap-southeast-1.amazonaws.com/' + this.userImage
          this.relationship = 'Bạn Bè'
        }
      }
    });
    this.sendData.curreentMess.subscribe((res) => {
      this.listMess = [];
      this.listMessRoom = [];
      for (let i in res.Items) {
        this.listMess.push({ userSend: res.Items[i].userSend, content: res.Items[i] });
      }
    });
    this.sendData.curreentMessRoom.subscribe((res) => {
      this.listMess = [];
      this.listMessRoom = [];
      for (var i in res.Items) {
        for (var j in this.memberOfRoom) {
          if (res.Items[i].userSend == this.memberOfRoom[j].account_name) {
            this.listMessRoom.push({ content: res.Items[i], image: this.memberOfRoom[j].user_image });
          }
        }
      }
    });
    this.socketChat.listen('serverSendTyping')
    .subscribe((data)=>{
      if(data['user_recive']==this.myAccount && data['user_name']==this.userName ){
          this.typing=true;
        }
        if(data['user_recive']==this.conventionID){
          this.typing=true;
        }
    });
    this.socketChat.listen('serverSendUnTyping')
    .subscribe((data)=>{
      if(data['user_recive']==this.myAccount && data['user_name']==this.userName ){
          this.typing=false;
        }
        if(data['user_recive']==this.conventionID){
          this.typing=false;
        }
    });
    this.socketChat.listen('reciveMessage')
      .subscribe((data) => {
        
        this.playAudio();
        if (data['userRecive'] == this.myAccount) {
          if( data['userSend'] == this.account_name){
          this.listMess.push({ userSend: data['userSend'], content: data });
          }else{  
          this.playAudio();
            let tempData = 'Có tin nhắn mới từ '+data['user_name']; 
            this.openNotification(tempData)      
          }
        }        
      });
    this.socketChat.listen('reciveMessageRoom')
      .subscribe((data => {     
        if(data['userRecive'] == this.userName){
          this.playAudio();
        this.listMessRoom.push({ content: data, image: data['image'] });
        console.log(this.userName); 
        }else{
          this.playAudio();
          let tempData = 'Có tin nhắn mới từ '+ data['userRecive']; 
          this.openNotification(tempData)      
        }
      }));      
  }
  ngAfterViewChecked() {
    this.scrollToBottom();
  }
  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }
  playAudio() {
    let audio = new Audio();
    audio.src = "../../../assets/sound.wav";
    audio.load();
    audio.play();
  }
  onFilePicked(event: Event): void {
    const FILE = (event.target as HTMLInputElement).files[0];
    this.fileObj = FILE;
    this.message = this.fileObj['name'];
  }
  //emoji
  addEmoji(event) {
    console.log(this.message)
    const text = `${this.message}${event.emoji.native}`;
    this.message = text;
  }
  //end emoji
  SendMessage() {    
    if (this.checkRoom == false && this.message.trim() != '') {
      const data = {
        userSend: this.myAccount,
        userRecive: this.account_name,
        content: this.message,
        isSend: true,
        roomName: '',
        file: "",
        type: "chat",
        checkRoom: false,
        user_name:localStorage.getItem('user_name'),
      }
      if (data.userSend > data.userRecive) {
        data.roomName = data.userSend + '#' + data.userRecive;
      } else {
        data.roomName = data.userRecive + '#' + data.userSend;
      }
      if (this.fileObj != null) {
        const fileForm = new FormData();
        fileForm.append('file', this.fileObj);
        this.messageService.uploadFile(fileForm).subscribe(res => {
          data.file = res['file'];
          data.content = res['file'];
          data.type = this.fileObj.type;
          this.socketChat.emit('sendMessage', data);
          this.listMess.push({ userSend: data.userSend, content: data });
          this.fileObj = null;
          this.message = '';
        });
      } else {
        data.file = "";
        this.socketChat.emit('sendMessage', data);
        this.listMess.push({ userSend: data.userSend, content: data });
        this.message = '';
      }
    }
    if (this.checkRoom == true && this.message.trim() != '') {
      const data = {
        userSend: this.myAccount,
        content: this.message,
        userRecive: this.userName,
        conventionID: this.conventionID,
        image: this.myImage,
        type:'chat',
        file:'',
      }
      if(this.fileObj!=null){
        const fileForm = new FormData();
        fileForm.append('file', this.fileObj);
        this.messageService.uploadFile(fileForm).subscribe(res => {          
          data.file = res['file'];
          data.content = res['file'];
          data.type = this.fileObj.type;
          this.socketChat.emit('SendMessRoom', data);
          this.listMessRoom.push({ content: data, image: this.avartar });
          this.fileObj = null;
          this.message = '';
        });
      }else{        
        data.file='';
        this.socketChat.emit('SendMessRoom', data);
        this.listMessRoom.push({ content: data, image: this.avartar });
        this.message = ''
      }
    }
  }
  onKeyUp($event){    
    const data = {
      user_name:localStorage.getItem('user_name'),
      user_recive:this.account_name
    }
    const dataB ={
      user_name:localStorage.getItem('user_name'),
      user_recive:this.conventionID
    }

   if(this.message.length !=0){
    if(this.checkRoom !=true){
      this.socketChat.emit('typing',data)
    }else{
      this.socketChat.emit('typing',dataB)
    }
   }else{
     if(this.checkRoom !=true){
      this.socketChat.emit('untyping',data)
    }else{
      this.socketChat.emit('untyping',dataB)
    }
   }
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
  toggled: boolean = false;
handleSelection(event) {
  console.log(event.char);
}
  
}


