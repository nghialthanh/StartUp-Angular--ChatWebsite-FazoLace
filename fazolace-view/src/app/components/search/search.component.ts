import { Component, OnInit } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import {MatDialog} from '@angular/material/dialog';
import { DialogaddComponent } from './dialogadd/dialogadd.component';
import { GroupComponent} from './group/group.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  fas = faSearch;
  faup = faUserPlus;
  fau = faUsers;
  user_name=localStorage.getItem("user_name")
  
  constructor(public dialog: MatDialog) { }
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogaddComponent, {
      width: '400px'
      
    });
  }openDialog2(): void {
    const dialogRef = this.dialog.open(GroupComponent, {
      width: '400px'
      
    });
  }
  ngOnInit(): void {
  }

}
