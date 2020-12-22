import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { SharedDataService } from 'src/app/services/sharedataservice.service'
import { FriendService } from 'src/app/services/friend.service'
import { ContactService } from "src/app/services/contact.service"
import { FormsModule } from "@angular/forms"
import { element } from 'protractor';
import { ElementSchemaRegistry } from '@angular/compiler';
import { ChatSocketService } from '../../services/chat-socket.service'
import { MatDialog } from '@angular/material/dialog';
import { DialogYesNoComponent } from '../dialog-yes-no/dialog-yes-no.component';
import { SendInfortoChatBoxService } from 'src/app/services/send-inforto-chat-box.service';
import { MessageConventionService } from 'src/app/services/message-convention.service';
import { LogicalFileSystem } from '@angular/compiler-cli/src/ngtsc/file_system';
import { count } from 'console';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-listfriend',
  templateUrl: './listfriend.component.html',
  styleUrls: ['./listfriend.component.scss']
})
export class ListfriendComponent implements OnInit {
  fa = faEllipsisH;
  fri = [];
  friList = [];
  listMess = [];
  urlImage = '';
  constructor(
    public dialog: MatDialog,
    private _contacservice: ContactService,
    private _data: SharedDataService,
    private _friendService: FriendService,
    private chatSocket: ChatSocketService,
    private sendData: SendInfortoChatBoxService,
    private messService: MessageConventionService,
    private userService: UserService) {
  }
  account_name = localStorage.getItem("acc");
  loadListFriend() {
    this.friList = [];
    this._friendService.loadListfriend(this.account_name).subscribe(
      res => {                
        if (res.result == '') {
        } else {
          for (var i in res.result) {
            if (res.result[i].user_image == undefined) {
              res.result[i].url = "/../../assets/iconfinder-8-avatar-2754583_120515.png"
            }
            else {
              res.result[i].url = "https://bucketchats.s3-ap-southeast-1.amazonaws.com/" + res.result[i].user_image
            }
            this.friList.push(res.result[i]);
          }
        }
      },
      err => err
    );    
  }


  loadListAdd() {
    this.fri = [];
    this._friendService.getAllreqfriend(this.account_name).subscribe(
      res => {
        if (res.result != '') {
          for (var i in res.result) {
            if (res.result[i].user_image == undefined) {
              res.result[i].url = "/../../assets/iconfinder-8-avatar-2754583_120515.png"
            }
            else {
              res.result[i].url = "https://bucketchats.s3-ap-southeast-1.amazonaws.com/" + res.result[i].user_image
            }
            this.fri.push(res.result[i])
          };
        } else {
        }
      },
      err => err
    )
  }

  loadListMessage() {
    this.listMess = [];
    const account = {
      account_name: this.account_name
    }
    this.messService.getAllConvention(account).subscribe(
      result => {
        result.Items.forEach(item => {
          if (item.conventionType === 'chat') {
            for (var i in item.members) {
              if (item.members[i] != this.account_name) {
                this.userService.loadInfouser(item.members[i])
                  .subscribe(res => {
                    this.listMess.push(
                      {
                        convention: "",
                        infor: res
                      });
                  });
              }
            }
          } else {
            this.listMess.push({ convention: item, infor: '' });
          }
        })
      },
      err => err
    );
  }


  ngOnInit(): void {
    this.urlImage = "https://bucketchats.s3-ap-southeast-1.amazonaws.com/";
    this._data.currentView.subscribe(
      res => {
        if (res == "List Friend") {
          this.loadListFriend();
          document.getElementById("ContactList").style.display = "none"
          document.getElementById("addFriend").style.display = "none"
          document.getElementById("listFriend").style.display = "inline"
        }
        else if (res == "List Message") {
          document.getElementById("addFriend").style.display = "none"
          document.getElementById("listFriend").style.display = "none"
          document.getElementById("ContactList").style.display = "inline"
          this.loadListMessage();
        }
        else if (res == "Accep Friend") {
          document.getElementById("ContactList").style.display = "none"
          document.getElementById("listFriend").style.display = "none"
          document.getElementById("addFriend").style.display = "inline"
          this.loadListAdd();
        }
      }
    )
    this.chatSocket.listen('sever-send-notificationRemove').subscribe(() => {
      this.loadListFriend();
    })
  }

  deleteContact(cl_id) {
    this._contacservice.deleteContact(cl_id).subscribe(
      res => {
        alert("Xóa thành công")
        // this.loadContactList();
      },
      err => {
        alert("Xóa không thành công")
      }
    )
  }
  editContact(cl_id) {
  }

  onAccept(req_friend, e1, e2) {
    const data = {
      friend: this.account_name,
      req_friend: req_friend
    }
    this._friendService.acceptFriend(data).subscribe(
      res => {
        this.chatSocket.emit('acceptReq',
          {
            message: "Đồng ý",
            friend: data.friend,
            req_friend: data.req_friend
          });
        //điền vào phần của nghĩa
        this.loadListFriend();
        if (e2 === 1)
          document.getElementById("status" + e1).innerHTML = "Đã chấp nhận kết bạn";
        else document.getElementById("status" + e1).innerHTML = "Đã xóa lời mời";
        document.getElementById("accep" + e1).style.display = 'none';
        document.getElementById("status" + e1).style.display = 'inline';
      },
      err => err
    )
  }


  onDenyList(req_friend) {
    const dialogRef = this.dialog.open(DialogYesNoComponent, {
      width: '380px',
      height: '100px',
      data: {
        title: 'BẠN CÓ CHẮC MUỐN XÓA ?',
        ktr: true,
      },
    });
    dialogRef.beforeClosed().subscribe(result => {
      this._data.currentconFirm.subscribe(
        res => {
          if (res == "Yes") {
            const data = {
              friend: this.account_name,
              req_friend: req_friend
            }
            this._friendService.unOrdenyFriend(data).subscribe(
              res => {
                dialogRef.close();
                this.loadListFriend();
              },
              err => err
            )
          }
          else {
            dialogRef.close();
          }
        }
      )
    })
  }

  onDenyAdd(req_friend, e1, e2) {
    const data = {
      friend: this.account_name,
      req_friend: req_friend
    }
    console.log(data);

    this._friendService.unOrdenyFriend(data).subscribe(
      res => {
        console.log(res);

        if (e2 === 1)
          document.getElementById("status" + e1).innerHTML = "Đã chấp nhận kết bạn";
        else document.getElementById("status" + e1).innerHTML = "Đã xóa lời mời";
        document.getElementById("accep" + e1).style.display = 'none';
        document.getElementById("status" + e1).style.display = 'inline';
      },
      err => err
    )

  }

  addFriend(contact_accountname) {
    alert(contact_accountname)
  }

  sendFromContact(user) {
    let data = {
      userSend: localStorage.getItem('acc'),
      userRecive: user.account_name,
    }
    const convention = {
      conventionID: '',
      chatID: Date.now()
    };
    if (data.userSend > data.userRecive) {
      convention.conventionID = data.userSend + '#' + data.userRecive;

    } else {
      convention.conventionID = data.userRecive + '#' + data.userSend;
    }
    this.messService.getAllMessage(convention)
      .subscribe(
        result => {          
          this.sendData.sendUser(user, result);
        },
        err => console.log(err),
      )
    this.chatSocket.emit('createRoomChat', data);
  }
  sendFromMessage(fromMessage) {
    if (fromMessage.infor != '') {
      //chat 11
      let data = {
        userSend: localStorage.getItem('acc'),
        userRecive: fromMessage.infor.account_name,
      }
      let convention = {
        conventionID: '',
        chatID: Date.now()
      };
      if (data.userSend > data.userRecive) {
        convention.conventionID = data.userSend + '#' + data.userRecive;

      } else {
        convention.conventionID = data.userRecive + '#' + data.userSend;
      }
      this.messService.getAllMessage(convention)
        .subscribe(
          result => {
            this.sendData.sendUser(fromMessage.infor, result);
          },
          err => console.log(err),
        )
      this.chatSocket.emit('createRoomChat', data);
    }
    else {
      //chat room
      const inforRoom = [];
      let list = [];
      for (var i in fromMessage.convention.members) {
        list.push({ account_name: fromMessage.convention.members[i] });
      }
      this.userService.getInforByList(list)
        .subscribe((result) => {
         for(var i in result){
           inforRoom.push(result[i]);
         }
        })
      let convention = {
        conventionID: fromMessage.convention.conventionID,
        inforRoom: fromMessage.convention,
        members: inforRoom,
        chatID: Date.now().toString()
      };
      this.messService.getAllMessage(convention)
        .subscribe(
          result => {            
            this.sendData.sendInforRoom(convention, result);
          },
          err => console.log(err),
        )
      // this.chatSocket.emit('createRoomChat', fromMessage.convention.conventionID);
    }
  }

}


