import { Component, OnChanges, SimpleChanges, OnInit,AfterViewChecked } from '@angular/core';
import {Sort} from '@angular/material/sort';
import { HttpClient} from '@angular/common/http';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import {DialogGotoComponent} from './subcomps/dialoggoto.component'
export interface Dessert {
  calories: number;
  carbs: number;
  fat: number;
  name: string;
  protein: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})




export class AppComponent  implements OnInit{
  title = 'griddataapp';

  desserts: Dessert[] = [];
  sortedData: Dessert[];
  position: string = "-1";
  lastSortMode:Sort;
  isUseFilter: boolean = false;


  constructor(private http: HttpClient, public dialog: MatDialog) {
    addEventListener("keydown",(e)=>{
      if(e.code=="ShiftLeft"){
        console.log(e.code);
        this.openDialog();
      }
      
    });
    
  }


  applyFilter(event: Event) {
    console.log("apply filter");
 
    const filterValue = (event.target as HTMLInputElement).value;
    const trimLowerFilterValue = filterValue.trim().toLowerCase();
    if (trimLowerFilterValue.length == 0) {     //If do not use filter must see all data in last choodes sort mode
      this.isUseFilter = false;
      if (this.lastSortMode) {
        this.sortData(this.lastSortMode);
      } else {

      }
    } else {
      this.isUseFilter = true;
      const data = this.desserts.slice();
      this.sortedData = data.filter((el, ind, arr) => {
        let pred1 = el.calories.toString().includes(trimLowerFilterValue);
        let pred2 = el.carbs.toString().includes(trimLowerFilterValue);
        let pred3 = el.fat.toString().includes(trimLowerFilterValue);
        let pred4 = el.protein.toString().includes(trimLowerFilterValue);
        let pred5 = el.name.toString().trim().toLowerCase().includes(trimLowerFilterValue);
        return (pred1 || pred2 || pred3 || pred4 || pred5);
      });
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogGotoComponent, {
      width: '250px',
      data: {position: this.position}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.position = result;
    });
  }

  clickBut1(): void{
    console.log("click");
    let sort1:Sort = {active:"protein", direction:"asc"};
    this.sortData(this.lastSortMode);
  }

  ngOnInit(): void{
    this.setDatas();
    this.sortedData = this.desserts.slice();
  }

  setDatas(): void{
    this.http.get('assets/tableGridData.json').
    subscribe((data: Dessert[]) => {this.desserts=data ; this.sortedData = this.desserts.slice();});
  }

  sortData(sort: Sort) {
    console.log("sorted data before sort=", this.sortedData);
    this.lastSortMode = sort;
    let data;

    if(this.isUseFilter==true){
      data=this.sortedData.slice();
    }else{
      data = this.desserts.slice();
    }

    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'calories': return compare(a.calories, b.calories, isAsc);
        case 'fat': return compare(a.fat, b.fat, isAsc);
        case 'carbs': return compare(a.carbs, b.carbs, isAsc);
        case 'protein': return compare(a.protein, b.protein, isAsc);
        default: return 0;
      }
    });

    console.log("sorted data after sort=", this.sortedData);
  }
}


function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}