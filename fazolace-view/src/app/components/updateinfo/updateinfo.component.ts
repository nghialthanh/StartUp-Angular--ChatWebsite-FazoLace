import { Component, OnInit,Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { UserElement } from 'src/app/classes/UserElement.classes';
import {UserService} from "src/app/services/user.service"
import {FormsModule} from "@angular/forms"
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import {Router} from "@angular/router"

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
  selector: 'app-updateinfo',
  templateUrl: './updateinfo.component.html',
  styleUrls: ['./updateinfo.component.scss']
})
export class UpdateinfoComponent implements OnInit {
  imageObj: File;
  imageUrl: string;
  fa= faCamera;
  account_name=localStorage.getItem("acc");
  url='https://bucketchats.s3-ap-southeast-1.amazonaws.com/'
  user_image
  user={
    user_name:'',
    user_date:'',
    user_gender:'',
    user_phone:'',
    user_email:'',
    account_name:localStorage.getItem('acc'),
  };
  constructor(
    private router:Router,
    private _userService:UserService,
    public dialogRef: MatDialogRef<UpdateinfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

    onImagePicked(event: Event): void {
      const file = (event.target as HTMLInputElement).files[0];
      console.log(file);
      this.imageObj = file;
    }

    onNoClick(): void {
      this.dialogRef.close()
    }

  ngOnInit(): void {
    this._userService.loadInfouser(this.account_name).subscribe(
      res=>{
        this.user = res;
        this.user_image=this.url+res.user_image;
      },
      err=>err
    );    
  }
  saveUpdate(): void{
    const imageForm =  new FormData();
    imageForm.append('user_image',this.imageObj);
    imageForm.append('account_name',this.user.account_name);
    imageForm.append('user_date',this.user.user_date);
    imageForm.append('user_email',this.user.user_email);
    imageForm.append('user_gender',this.user.user_gender);
    imageForm.append('user_name',this.user.user_name);
    imageForm.append('user_phone',this.user.user_phone);   
  
    this._userService.updateInfo(imageForm).subscribe(
      res=>{
        this.dialogRef.close();
        alert('Cập Nhật Thành Công')
        this._userService.loadInfouser(localStorage.getItem("acc")).subscribe(
          res=>{
            localStorage.setItem("image",res.user_image)
            this.user_image = this.url+localStorage.getItem('image');
            this.router.navigate([''])
          },
          err=>err,
        )
      },
      err=>err
    )
  }
  
}
