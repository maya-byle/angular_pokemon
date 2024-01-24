import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pokemon } from '../interfaces/pokemon.interface';

// could be better to extract and save the list here so that every component who need this list could get it from the service
@Injectable({
  providedIn: 'root',
})
export class PokemonDataService {
  private apiUrl: string = 'https://pokeapi.co/api/v2/pokemon';

  constructor(private http: HttpClient) {}

  getPokemonList(
    limit: number = 100,
    offset: number = 0
  ): Observable<{ name: string; url: string }[]> {
    const url = `${this.apiUrl}?limit=${limit}&offset=${offset}`;
    return this.http.get<{ name: string; url: string }[]>(url);
  }

  getPokemonData(url: string): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>(url);
  }
}
