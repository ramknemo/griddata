import { Component,Inject, OnChanges, SimpleChanges, OnInit,AfterViewChecked } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Deal} from '../app.component'
import {TextFilterType, NumberFilterType} from './filter.config.constatnts'
export interface DialogData {
  columns:any;
  selectedValue:string;
  filterChoosedConfs: ConfFilterItem[];
}
export interface ConfFilterItem {
  filterText:string;
  filterType:string;
  field:string;
  boolOper:string;
  minValue:string;
  maxValue:string;
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
    boolOper: null,
    minValue: "",
    maxValue: ""
  }
  ];

  errorString:string = "";
  
  filterTypesForString: string[] = TextFilterType.getAllTypes();
  filterTypesForNumber: string[] = NumberFilterType.getAllTypes();
  filterBoolOpersTypes: string[] = ["And", "Or"];


  constructor(
    public dialogRef: MatDialogRef<FilterDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
      if(data.filterChoosedConfs.length>=1)
        this.filterChoosedConfs=data.filterChoosedConfs;
      console.log("I worked");

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addClickHandler():void{
    this.filterChoosedConfs.push({
      filterText: "",
      filterType: undefined,
      field: "",
      boolOper: null,
      minValue: "",
      maxValue: ""
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

  applyButtonClickHandler(){
    let isValid:boolean = true;
    isValid = this.validateForm(this.filterChoosedConfs);
    if(isValid==true){
      this.dialogRef.close(this.filterChoosedConfs);
      this.errorString="";
    }else{
      this.errorString="You must fill whole form!";
    }
  }


  validateForm(filterChoosedConfs: ConfFilterItem[]):boolean{
    let res:boolean=true;
    for(let i=0;i<filterChoosedConfs.length;i++){
      
      if (i > 0 && !filterChoosedConfs[i].boolOper) {
        res = false;
        break;
      }

      if(!filterChoosedConfs[i].field){
        res=false;
        break;
      }

      if(!filterChoosedConfs[i].filterType){
        res=false;
        break;
      }

      if(filterChoosedConfs[i].filterType==="BETWEEN"){
        if(!filterChoosedConfs[i].maxValue || !filterChoosedConfs[i].minValue){
          res=false;
          break;
        }
      }else{
        if(!filterChoosedConfs[i].filterText){
          res=false;
          break;
        }
      }
    }
    
    return res;
  }
 
}