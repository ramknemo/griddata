import { Component,Inject, OnChanges, SimpleChanges, OnInit,AfterViewChecked } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Deal} from '../app.component'
import {TextFilterType, NumberFilterType} from './filter.config.constatnts'
export interface DialogData {
  columns:any;
  selectedValue:string;
}
export interface ConfFilterItem {
  filterText:string;
  filterType:string;
  field:string;
  boolOper:string;
}
@Component({
  selector: 'filterdialog-comp',
  templateUrl: './filterdialog.component.html',
  styleUrls: ['./filterdialog.component.css']
})
export class FilterDialogComponent {
  filterConf: any = {
    filterValue: "",
    selectedValue: ""
  };

  filterChoosedConfs: ConfFilterItem[] = [{
    filterText: "",
    filterType: undefined,
    field: "",
    boolOper: null
  }
  ];

  
  filterTypesForString: string[] = TextFilterType.getAllTypes();
  filterTypesForNumber: string[] = NumberFilterType.getAllTypes();
  filterBoolOpersTypes: string[] = ["And", "Or"];


  constructor(
    public dialogRef: MatDialogRef<FilterDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addClickHandler():void{
    this.filterChoosedConfs.push({
      filterText: "",
      filterType: undefined,
      field: "",
      boolOper: null
    });
  }

  removeCLickHandler():void{
    if(this.filterChoosedConfs.length!=1){
      this.filterChoosedConfs.pop();
    }
  }

  getTypeOfField(fieldName:string):string{
    switch(fieldName){
      case "id":
      case "summ":
          return "number";
      default:
          return "string";
    }
    // let obj:Deal;
    // let typeOfField:any = typeof obj[fieldName];
    // return typeOfField;  
    

  }


}