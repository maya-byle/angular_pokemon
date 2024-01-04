// Purpose: Configuration and Bootstrapping

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CardComponent } from '../components/card/card.component';
import { OpenCardComponent } from '../components/open-card/open-card.component';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    OpenCardComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
