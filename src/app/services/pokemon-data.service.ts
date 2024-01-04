import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonDataService {
  constructor(private http: HttpClient) {}

  getPokemonData(url: string): Observable<any> {
    return this.http.get(url);
  }
}
