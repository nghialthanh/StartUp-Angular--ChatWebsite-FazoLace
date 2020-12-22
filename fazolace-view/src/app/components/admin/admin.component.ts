import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AdminDialogComponent } from '../admin-dialog/admin-dialog.component';
import { AdminService } from 'src/app/services/admin.service'
import { UserElement } from 'src/app/classes/UserElement.classes'
import { SharedDataService } from 'src/app/services/sharedataservice.service'




@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})

export class AdminComponent implements AfterViewInit, OnInit {
  ELEMENT_DATA: UserElement[] = []
  copyfile;
  //Lay du lieu
  getall() {
    this._auth.onAdminGetAllUser().subscribe(
      res => {
        this.ELEMENT_DATA = res.map(m => m);
        this.copyfile = res.map(m => m);
        this.dataSource = new MatTableDataSource<UserElement>(this.ELEMENT_DATA.filter(status=>status.account_status==="available"));        
        this.dataSource.paginator = this.paginator;
      })
  }

  getInfoadmin() {
    this._data.currentMessage.subscribe(
      res => this.user_name = res
    )
  }
  user_name
  account_name = "duytan8q";
  role = "Admin"
  user_image = "https://i.pinimg.com/474x/2c/40/e2/2c40e25ad6ce7a6ba9969dfa1f96c5df.jpg";
  user_phone = '090599';
  user_gender = "2";
  user_date = "12/12/2012";
  user_email = "hieu@gmail.com";



  checkLeftSide = false;
  isCheckBaner = false;
  isCheckFeature = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngAfterViewInit(): void {




  }
  displayedColumns: string[] = ['account', 'password', 'user_name', 'user_status', "button"];
  dataSource;
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  constructor(public _data: SharedDataService, public dialog: MatDialog, public router: Router, public _auth: AdminService,) { }


  ngOnInit(): void {

    this.getall()
    this.getInfoadmin()
  }


  LogOutClick(): void {
    this.router.navigate(['login']);
  }


  openDialog(): void {
    this.isCheckFeature = !this.isCheckFeature;
    const dialogRef = this.dialog.open(AdminDialogComponent, {
      //định dạng dialog
      width: '30%',
      height: '95vh',
      // truyền data đi 
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
      this.getall()
    });
  }


  GetElement(event, account_name) {
    console.log(account_name);
    alert(account_name);
  }



  ChangeToogle() {
    var data = this.ELEMENT_DATA;
    var temp = this.copyfile;

    if (this.isCheckBaner === true) {
      this.dataSource = new MatTableDataSource<UserElement>(this.ELEMENT_DATA.filter(status=>status.account_status !="available"));
    }
    else {
      this.getall()
    }
  }




  //Phần Tâm Sửa
  onBan(event, account_name, account_status) {

    var ac1 = {
      account_name:account_name,
      account_status: '',
    }


    if (account_status === "available") {
      ac1.account_status = "avail"
      this._auth.onChangeStatus(ac1).subscribe(
        res => {
          this.getall();
        }
      )
    }
    else {
      ac1.account_status = "available"
      this._auth.onChangeStatus(ac1).subscribe(
        res => {
          this.getall();
        }
      )
    }

    this.isCheckBaner = false
  }

  onDelete(event, account_name){
      this._auth.onAdmindelete(account_name).subscribe(
        res=>{
          alert('Xóa Thành Công')
          this.getall()
        },
        err=>console.log(err)
        
      )    
  }
}