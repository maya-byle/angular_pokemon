// Purpose: Configuration and Bootstrapping

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CardComponent } from './components/Card/card.component';
import { OpenCardComponent } from './components/OpenCard/openCard.component';
import { SearchBarComponent } from './components/SearchBar/search-bar/search-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    OpenCardComponent,
    SearchBarComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
