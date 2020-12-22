import { AfterViewInit, Component, OnInit, ViewChildren, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatStepper, matStepperAnimations } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { timer } from 'rxjs';
import { RegsiterService } from 'src/app/services/regsiter.service'




@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  @ViewChild('stepper') stepper: MatStepper;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  isOptional = false;
  hide = true;
  isRequired = true;
  temp = {
    passConfirm: '',
  }
  accountRegister = {
    account_name:'',
    code:''
  }

  user1 = {
    user_name: '',
    user_image: 'defaul',
    user_phone: '',
    user_gender: '',
    user_email: '',
    user_date: '',
    account_pass: '',
    account_name:''
  }
  isCheckBox = false;
  constructor(
    private _formBuilder: FormBuilder,
    public _auth: RegsiterService,
    public router: Router) { }



  ngOnInit(): void {
    console.clear(),
    localStorage.clear()
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl_phone: [],
      firstCtrl_email: [],
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl_OTP: ['', Validators.required]
    }); 
  }



  checkAccount_name(){
    if(this.user1.user_phone==''){
      this.accountRegister.account_name=this.user1.user_email
    }
    else{
      this.accountRegister.account_name=this.user1.user_phone
    }
  }



  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  }


  ClickHidePassword() {
    this.hide = !this.hide;
    if (this.hide == false) {
      let source = timer(2000);
      let subscribe = source.subscribe(val => this.hide = !this.hide);
    }

  }


  KeyDownPhone() {
    this.user1.user_email = '' 
    if(this.user1.user_phone!=''){
      this.isRequired=false
    }
    else{
      this.isRequired=true
    }
  }

  KeyDownEmail() {
    this.user1.user_phone = ''
    if(this.user1.user_email!=''){
      this.isRequired=false
    }
    else{
      this.isRequired=true
    }
  }

  resigterAccount() {
    if(this.isRequired==false){
      this.checkAccount_name()
      this._auth.onRegsiter(this.accountRegister).subscribe(
        res=>{
          this.stepper.next();
        },
        err=>err,
      ) 
    }
  }

  confirmOTP() {
    if (this.accountRegister.code.length < 6) {
      alert("Mã xác nhận không đúng")
    }
    else {
      this._auth.onRegsiterConfirm(this.accountRegister).subscribe(
        res =>{
           this.stepper.next();
        },
        err => err
      )
    }
  }

  onUpdateuser() {
    this.user1.account_name= this.accountRegister.account_name
    this._auth.onUpdateuser(this.user1).subscribe(
      res => {
        this.router.navigate(['login']) 
      },
      err => err
    )
  }
}
