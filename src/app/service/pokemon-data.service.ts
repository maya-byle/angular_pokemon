import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonDataService {
  private apiUrl: string = 'https://pokeapi.co/api/v2/pokemon';

  constructor(private http: HttpClient) {}

  getPokemonList(limit: number = 100, offset: number = 0): Observable<any> {
    const url = `${this.apiUrl}?limit=${limit}&offset=${offset}`;
    return this.http.get(url);
  }

  getPokemonData(url: string): Observable<any> {
    return this.http.get(url);
  }
}
