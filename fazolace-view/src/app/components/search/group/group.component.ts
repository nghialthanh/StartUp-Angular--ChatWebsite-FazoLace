import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FriendService } from 'src/app/services/friend.service';
import { MessageConventionService } from 'src/app/services/message-convention.service';
@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {
  info: {};
  namegroup: '';
  listFriend = [];
  account_name = '';
  listMembers = [];
  imageObj: File;
  imageUrl: string;
  url = "https://bucketchats.s3-ap-southeast-1.amazonaws.com/";
  constructor(
    private friendService: FriendService,
    private messService: MessageConventionService
  ) { }

  ngOnInit(): void {
    this.account_name = localStorage.getItem('acc');
    this.friendService.loadListfriend(this.account_name)
      .subscribe(result => {
        for(var i in result.result){
          this.listFriend.push(result.result[i]);
        }
      });                
  }
  onImagePicked(event: Event): void {
    const file = (event.target as HTMLInputElement).files[0];
    console.log(file);
    this.imageObj = file;
  }
  createRoom(nameGroup) {
    this.listMembers.push(this.account_name);
    const convention = {
      conventionID: Date.now().toString(),
      conventionName: nameGroup,
      conventionImage: "default",
      Owner: this.account_name,
      members: this.listMembers,
      conventionTime: Date.now().toString()
    }
    const imageForm =  new FormData();
    imageForm.append('conventionImage',this.imageObj);
    imageForm.append('conventionID',convention.conventionID);
    imageForm.append('conventionName',convention.conventionName);
    imageForm.append('Owner',convention.Owner);
    imageForm.append('members', '');
    imageForm.append('conventionTime',convention.conventionTime);
    this.messService.addConventionn(imageForm)
      .subscribe((result) => {
        this.messService.updateConvention(convention)
        .subscribe((result)=>{
          alert('Tạo Nhóm Thành Công')
        })      
      },
        (err) => console.log(err)
      )
  }
  getInfor(data) {    
    this.listMembers.push(data);
  }

}
