import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { SuiModule } from 'ng2-semantic-ui';

import { AppComponent }  from './app.component';

@NgModule({
  imports:      [ 
    BrowserModule, SuiModule
  ],

  declarations: [ AppComponent ],

  bootstrap:    [ AppComponent ]
})
export class AppModule { }
