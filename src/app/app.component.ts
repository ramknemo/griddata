import { Component, OnChanges, SimpleChanges, OnInit,AfterViewChecked } from '@angular/core';
import {Sort} from '@angular/material/sort';
import { HttpClient} from '@angular/common/http';

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
export class AppComponent  implements OnInit,AfterViewChecked{
  title = 'griddataapp';

  // desserts: Dessert[] = [
  //   {name: 'Frozen yogurt', calories: 159, fat: 6, carbs: 24, protein: 4},
  //   {name: 'Ice cream sandwich', calories: 237, fat: 9, carbs: 37, protein: 4},
  //   {name: 'Eclair', calories: 262, fat: 16, carbs: 24, protein: 6},
  //   {name: 'Cupcake', calories: 305, fat: 4, carbs: 67, protein: 4},
  //   {name: 'Gingerbread', calories: 356, fat: 16, carbs: 49, protein: 4},
  // ];
  desserts: Dessert[] = [];
  sortedData: Dessert[];
  
  constructor(private http: HttpClient) {
    
  }

  ngAfterViewChecked(){
    //this.http.get('assets/tableGridData.json').subscribe((data: Dessert[]) => this.desserts=data);
  }
  ngOnInit(){
    this.setDatas();
    this.sortedData = this.desserts.slice();
    //this.setDatas();
    //console.log("datas="+this.);
    //this.http.get('assets/tableGridData.json').subscribe((data: Dessert[]) => this.desserts=data);
  }

  setDatas(){
    //this.desserts=[{name: 'Frozen yogurt XXX', calories: 159, fat: 6, carbs: 24, protein: 4}];
    this.http.get('assets/tableGridData.json').subscribe((data: Dessert[]) => {this.desserts=data ; this.sortedData = this.desserts.slice();});
  }

  sortData(sort: Sort) {
    const data = this.desserts.slice();
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
  }
}


function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}