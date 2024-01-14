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
import { LoginComponent } from './pages/Login/login.component';
import { PokemonsListComponent } from './pages/pokemons-list/pokemons-list.component';
import { MyMapComponent } from './pages/my-map/my-map.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  { path: '', redirectTo:'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'cards', component: PokemonsListComponent, canActivate: [AuthGuard] },
  { path: 'map', component: MyMapComponent },
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
    MyMapComponent,
    HomeComponent,
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
