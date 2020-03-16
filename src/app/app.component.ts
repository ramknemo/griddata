import { Component, OnChanges, SimpleChanges, OnInit,AfterViewChecked, ViewChild, AfterViewInit,ElementRef,HostListener,Renderer2 } from '@angular/core';
import {Sort} from '@angular/material/sort';
import { HttpClient} from '@angular/common/http';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {DialogGotoComponent} from './subcomps/dialoggoto.component'
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {data} from "./data"
import {MatTable} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {PageEvent} from '@angular/material/paginator';
import { CookieService } from 'ngx-cookie-service';
import { FilterDialogComponent } from './filterdialog/filterdialog.component';
import {TextFilterType, NumberFilterType} from './filterdialog/filter.config.constatnts'
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
export class AppComponent implements OnInit,AfterViewInit,AfterViewChecked{
  displayedColumns: string[] = ['id','name','summ','inn','type'];
  dataSource = new MatTableDataSource(deals);
  private cookieSize: any;
  filterChoosedConfs:any;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort,{static: true}) sort: MatSort;
  @ViewChild(MatTable, {read: ElementRef} ) private matTableRef: ElementRef;
  

  constructor(private http: HttpClient,
    private renderer: Renderer2, 
    public dialog: MatDialog,
    private cookieService: CookieService) {
      
  }
  
  ngOnInit(){
    this.cookieSize = this.cookieService.get("sizeColumns");
    if(this.cookieSize){
      console.log(this.cookieSize);
      this.columns = JSON.parse(this.cookieSize);
    }
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
     
    if(this.cookieService.get("pagination")){
      let cookiePagination:PageEvent = JSON.parse(this.cookieService.get("pagination"));
      this.dataSource.paginator.pageIndex = cookiePagination.pageIndex;
      this.dataSource.paginator.pageSize = cookiePagination.pageSize;
    }
    
    if(this.cookieService.get("sort")){
      let cookieSort:Sort = JSON.parse(this.cookieService.get("sort"));
      this.dataSource.sort.direction = cookieSort.direction;
      this.dataSource.sort.active = cookieSort.active;
    }
  }

  ngAfterViewChecked() {
    this.setTableResize(this.matTableRef.nativeElement.clientWidth);
    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }



  //resize:


  columns: any[] = [
    { field: 'id', width: 100,  },
    { field: 'name', width: 150, },
    { field: 'summ', width: 250, },
    { field: 'inn', width: 300, },
    { field: 'type', width: 100, }
  ];
  

  pressed = false;
  currentResizeIndex: number;
  startX: number;
  startWidth: number;
  isResizingRight: boolean;
  resizableMousemove: () => void;
  resizableMouseup: () => void;

  ngAfterViewInit() {
    this.setTableResize(this.matTableRef.nativeElement.clientWidth);
  }

  setTableResize(tableWidth: number) {
    let totWidth = 0;
    this.columns.forEach(( column) => {
      totWidth += column.width;
    });
    const scale = (tableWidth - 5) / totWidth;
    this.columns.forEach(( column) => {
      column.width *= scale;
      this.setColumnWidth(column);
    });
  }

  setDisplayedColumns() {
    this.columns.forEach(( column, index) => {
      column.index = index;
      this.displayedColumns[index] = column.field;
    });
  }

  onResizeColumn(event: any, index: number) {
    this.checkResizing(event, index);
    this.currentResizeIndex = index;
    this.pressed = true;
    this.startX = event.pageX;
    this.startWidth = event.target.clientWidth;
    event.preventDefault();
    this.mouseMove(index);
  }

  private checkResizing(event, index) {
    const cellData = this.getCellData(index);
    if ( ( index === 0 ) || ( Math.abs(event.pageX - cellData.right) < cellData.width / 2 &&  index !== this.columns.length - 1 ) ) {
      this.isResizingRight = true;
    } else {
      this.isResizingRight = false;
    }
  }

  private getCellData(index: number) {
    const headerRow = this.matTableRef.nativeElement.children[0];
    const cell = headerRow.children[index];
    return cell.getBoundingClientRect();
  }

  mouseMove(index: number) {
    this.resizableMousemove = this.renderer.listen('document', 'mousemove', (event) => {
      if (this.pressed && event.buttons ) {
        const dx = (this.isResizingRight) ? (event.pageX - this.startX) : (-event.pageX + this.startX);
        const width = this.startWidth + dx;
        if ( this.currentResizeIndex === index && width > 50 ) {
          this.setColumnWidthChanges(index, width);
        }
      }
    });
    this.resizableMouseup = this.renderer.listen('document', 'mouseup', (event) => {
      if (this.pressed) {
        this.pressed = false;
        this.currentResizeIndex = -1;
        this.resizableMousemove();
        this.resizableMouseup();
      }
    });
  }

  setColumnWidthChanges(index: number, width: number) {
    const orgWidth = this.columns[index].width;
    const dx = width - orgWidth;
    if ( dx !== 0 ) {
      const j = ( this.isResizingRight ) ? index + 1 : index - 1;
      const newWidth = this.columns[j].width - dx;
      if ( newWidth > 50 ) {
          this.columns[index].width = width;
          this.setColumnWidth(this.columns[index]);
          this.columns[j].width = newWidth;
          this.setColumnWidth(this.columns[j]);
        }
    }
  }

  setColumnWidth(column: any) {
    const columnEls = Array.from( document.getElementsByClassName('mat-column-' + column.field) );
    columnEls.forEach(( el: HTMLDivElement ) => {
      this.renderer.setStyle(el,"width",column.width + 'px');
      //el.style.width = column.width + 'px';
    });
    this.cookieService.set("sizeColumns",JSON.stringify(this.columns));     
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.setTableResize(this.matTableRef.nativeElement.clientWidth);
  }


  handleChangePage(event:PageEvent){
    this.cookieService.set("pagination",JSON.stringify(event));   
 

  }
  sortData(sort: Sort) {
    this.cookieService.set("sort",JSON.stringify(sort)); 
  }

  filterButtonClick(){
    this.openDialog();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(FilterDialogComponent, {
      width: '750px',
      data: {
        columns:this.columns
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("Filter config: "+JSON.stringify(result));
      if(result){
        this.dataSource.filterPredicate = this.createFilter(result);
        this.dataSource.filter = "starting run filter string";
      }
    });
  }

  //returns filter function
  createFilter(filterChoosedConfs: any[]) {
    return (data: Deal, filter: string):boolean => {
      let resExp: string = "";
      if (filterChoosedConfs.length == 0) {
        return false;
      }
      let curUsedField = filterChoosedConfs[0].field;
      resExp += "" + this.predSmall(data[curUsedField], filterChoosedConfs[0].filterType, filterChoosedConfs[0].filterText);
      if (filterChoosedConfs.length > 1) {
        for (let i = 1; i < filterChoosedConfs.length; i++) {
          switch (filterChoosedConfs[i].boolOper) {
            case "And":
              resExp += "&&";
              break;
            case "Or":
              resExp += "||";
              break;
          }
          curUsedField = filterChoosedConfs[i].field;
          resExp += "" + this.predSmall(data[curUsedField], filterChoosedConfs[i].filterType, filterChoosedConfs[i].filterText);

        }
      }
      console.log(resExp);
      return eval(resExp);
    };
  }

  /*Val - column value of extact line, oper - filter settings*/
  predSmall(valFromTable:string, operType:string, value:string):boolean {
    //console.log("pred val="+val);
    let res:boolean = false;
    switch(operType){
      case TextFilterType.BEGIN():
        res = valFromTable.startsWith(value);
        break;
      case TextFilterType.END():
        res = valFromTable.endsWith(value);
        break;
      case TextFilterType.CONSIST():
        res = valFromTable.includes(value);
        break;
      case NumberFilterType.BIGGER():
        res = parseInt(value)>parseInt(valFromTable);
        break; 
      case NumberFilterType.SlOWER():
        res = parseInt(value)<parseInt(valFromTable) 
        break; 
      case NumberFilterType.EQUALS(): 
        res = parseInt(value)==parseInt(valFromTable)
        break;
    }
    return res;
  }
  setOffFilter(){
    this.dataSource.filterPredicate = (data: Deal, filter: string):boolean =>{return true;}
    this.dataSource.filter = "starting run filter string";

  }

  

}


