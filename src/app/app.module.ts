// Purpose: Configuration and Bootstrapping

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { CardComponent } from './components/Card/card.component';
import { OpenCardComponent } from './components/OpenCard/openCard.component';
import { SearchBarComponent } from './components/SearchBar/search-bar.component';
import { LoginComponent } from './components/Login/login.component';
import { PokemonsListComponent } from './components/pokemons-list/pokemons-list.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo:'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard]  },
  { path: 'cards', component: PokemonsListComponent, canActivate: [AuthGuard] },
  { path: '**', component: LoginComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    OpenCardComponent,
    SearchBarComponent,
    LoginComponent,
    PokemonsListComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes), 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
