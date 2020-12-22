import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogYesNoComponent } from '../../dialog-yes-no/dialog-yes-no.component';
import {UserService} from 'src/app/services/user.service'


@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.component.html',
  styleUrls: ['./change-pass.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  account={
    account_name:localStorage.getItem("acc"),
    account_pass:'',
    passNew:''
  }
  confirmPassnew

  constructor(
    public dialogRef: MatDialogRef<ChangePasswordComponent>,
    public dialog: MatDialog, 
    private _api:UserService) { }

  ngOnInit(): void {
  }
  changePass(){
    if(this.confirmPassnew!=this.account.passNew){
      alert("Xác nhận mật khẩu không trùng khớp")
    }
    else{
    this._api.ChangePass(this.account).subscribe(
      res=>{
        const dialogRef = this.dialog.open(DialogYesNoComponent, {
          width: '380px',
          height: '100px',
          data: {
            title: 'ĐỔI MẬT KHẨU THÀNH CÔNG !',
            ktr: false
          }
        });
        dialogRef.afterClosed().subscribe(result => {
          this.dialogRef.close()
        });
      },
      err=>{
        const dialogRef = this.dialog.open(DialogYesNoComponent, {
          width: '380px',
          height: '100px',
          data: {
            title: 'ĐỔI MẬT KHẨU KHÔNG THÀNH CÔNG !',
            ktr: false
          }
        });
        dialogRef.afterClosed().subscribe(result => {
        });
      }
    )}
  }
}