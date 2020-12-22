import { Component, OnInit, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {SharedDataService} from 'src/app/services/sharedataservice.service'

export interface DialogData {
  title: string;
  ktr: boolean;
}
@Component({
  selector: 'app-dialog-yes-no',
  templateUrl: './dialog-yes-no.component.html',
  styleUrls: ['./dialog-yes-no.component.scss']
})
export class DialogYesNoComponent implements OnInit {
  constructor(
    private dataConfirm:SharedDataService,
    public dialogRef: MatDialogRef<DialogYesNoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {
  }
  Yes(){
    this.dataConfirm.changeConfirm("Yes")
    this.dialogRef.close()
  }

  No(){
    this.dataConfirm.changeConfirm("No")
    this.dialogRef.close()
  }
}
