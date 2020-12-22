import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service'
import { SharedDataService } from 'src/app/services/sharedataservice.service'
import { UserElement } from "src/app/classes/UserElement.classes"


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide = true;
  mes: string
  user1 = {
    account_name: '0375616567',
    account_pass: 'admin'
  }
  constructor(
    private _data: SharedDataService,
    private _auth: LoginService,
    public router: Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('token')!=null){
      this.router.navigate(['Dashboard'])
    }
    this._data.changeView("List Friend")
  }
  ClickHidePassword() {
    this.hide = !this.hide;
    if (this.hide == false) {
      let source = timer(2000);
      let subscribe = source.subscribe(val => this.hide = !this.hide);
    }

  }

  onLogin() {
    if (this.user1.account_pass === '' || this.user1.account_name === '')
      alert("Vui Lòng Nhập Tài Khoản Mật Khẩu")
    else {
      this._auth.onLoginUser(this.user1).subscribe(
        res => {
          this._data.changeMessage(res.user[0].user_name)
          if (res.acc[0].account_Role == "1" && res.acc[0].account_status==="available") {
            localStorage.setItem('user_name',res.user[0].user_name)
    
            localStorage.setItem('acc',res.acc[0].account_name)
            localStorage.setItem('admintoken', res._lg)
            this.router.navigate(['admin'])
          }
          else {
            if(res.acc[0].account_status==="available" && res.acc[0].account_Role=="0"){
              localStorage.setItem('user_name',res.user[0].user_name)
              localStorage.setItem('image',res.user[0].user_image)
              localStorage.setItem('acc',res.acc[0].account_name)
              localStorage.setItem('token', res._lg)
              this.router.navigate(['Dashboard'])
              
            }
          }
        },
        err => {
          alert("Tên tài khoản mật khẩu không đúng")
          console.log(err)
        }
      )
    }
  }
}

