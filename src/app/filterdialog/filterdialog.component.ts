import { Component,Inject, OnChanges, SimpleChanges, OnInit,AfterViewChecked } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  dataFromFilterDialog:any;
  selectedValue:string;

}

@Component({
    selector: 'filterdialog-comp',
    templateUrl: './filterdialog.component.html',
    styleUrls: ['./filterdialog.component.css']
  })
  export class FilterDialogComponent {
    selectedValue: string;
    constructor(
        public dialogRef: MatDialogRef<FilterDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
    
      onNoClick(): void {
        this.dialogRef.close();
      }
  }