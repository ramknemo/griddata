import { Component,Inject, OnChanges, SimpleChanges, OnInit,AfterViewChecked } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
    position: string;
  }

@Component({
    selector: 'dialoggoto-comp',
    templateUrl: './dialoggoto.component.html',
    styleUrls: ['./dialoggoto.component.css']
  })
  
  export class DialogGotoComponent {
    constructor(
        public dialogRef: MatDialogRef<DialogGotoComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
    
      onNoClick(): void {
        this.dialogRef.close();
      }
  }