import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { interval, timer } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service'
import { AdminComponent } from '../admin/admin.component'

export interface DialogData {
  user_name: string;
  account_name: string;
  role: number;
  user_image: string;
  user_phone: string;
  user_gender: string;
  user_date: Date;
  user_email: string;
}
@Component({
  selector: 'app-admin-dialog',
  templateUrl: './admin-dialog.component.html',
  styleUrls: ['./admin-dialog.component.scss']
})

export class AdminDialogComponent implements OnInit {
  user1 = {
    user_image: "https://lh3.googleusercontent.com/4qAz40o6M5w6hJ62VsjwGbYueB0fRWPmiG1yOZpNHn3qo2uzlhZZ1mwE5jtBlPp3Lw",
    user_name: '',
    user_phone: '',
    user_date: '',
    user_gender: '',
    user_email: '',
    account_pass: '123456',
    account_status: 'available',
    account_Role: '1',
    account_name:''
  }

  constructor(
    public _auth: AdminService,
    public dialogRef: MatDialogRef<AdminDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, 
    public router: Router) { }

  checkTypeAccount(){
    if(this.user1.user_phone != '' && this.user1.user_name != ''){
      this.user1.account_name=this.user1.user_phone
    }
    else if(this.user1.user_phone==''){
      this.user1.account_name=this.user1.user_email
    }
    else if(this.user1.user_name==''){
      this.user1.account_name=this.user1.user_phone
    }
  }
  onAdd() {
    this.checkTypeAccount()  
    this._auth.onAdminResigterUser(this.user1).subscribe(
      res => {
        this.dialogRef.close();
        alert("Thêm thành công")
      },
      err => alert("Trung Tai Khoan Mat Khau")
    )
  }
  CloseDialog() {
    this.dialogRef.close();
  }
  ngOnInit(): void {
  }
  onFileInput(event) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.user1.user_image = reader.result.toString();
    };
    reader.readAsDataURL(event.target.files[0]);
  }
}
