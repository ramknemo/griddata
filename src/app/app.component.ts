import { Component, OnChanges, SimpleChanges, OnInit,AfterViewChecked, ViewChild } from '@angular/core';
import {Sort} from '@angular/material/sort';
import { HttpClient} from '@angular/common/http';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {DialogGotoComponent} from './subcomps/dialoggoto.component'
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {data} from "./data"

export interface Deal{
  id: number;
  name: string;
  summ: number;
  inn: string;
  type: string;
}

const deals: Deal[] = data;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
  
})
export class AppComponent implements OnInit{
  displayedColumns: string[] = ['id','name','summ','inn','type'];
  dataSource = new MatTableDataSource(deals);

  @ViewChild(MatSort,{static: true}) sort: MatSort;

  constructor(private http: HttpClient) {
  }

  ngOnInit(){
    this.dataSource.sort = this.sort;
  }
}