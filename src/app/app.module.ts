import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import {MatSortModule} from '@angular/material/sort';
import { HttpClientModule }   from '@angular/common/http';
import {MatDialogModule} from '@angular/material/dialog';
import {DialogGotoComponent} from './subcomps/dialoggoto.component'
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {MatMenuModule} from '@angular/material/menu';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {CookieService} from 'ngx-cookie-service'
import {FilterDialogComponent} from './filterdialog/filterdialog.component'
import {MatSelectModule} from '@angular/material/select';
import {MatToolbarModule} from '@angular/material/toolbar';
@NgModule({
  declarations: [
    AppComponent,DialogGotoComponent,FilterDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatSortModule,
    HttpClientModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    ScrollingModule,
    MatMenuModule,
    MatGridListModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatSelectModule,
    MatToolbarModule
    
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
