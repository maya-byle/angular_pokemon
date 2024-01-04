import { Component, OnInit } from '@angular/core';
import { Pokemon } from './interfaces/pokemon.interface';
import { PokemonListService } from './services/pokemon-list.service';
import { PokemonDataService } from './services/pokemon-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  pokemons: Pokemon[] = [];

  constructor(
    private pokemonListService: PokemonListService,
    private pokemonDataService: PokemonDataService
  ) {}

  ngOnInit(): void {
    this.getPokemonList();
  }

  getPokemonList(): void {
    this.pokemonListService.getPokemonList().subscribe(
      (data: any) => {
        const pokemonsList: { name: string, url: string }[] = data.results;
        pokemonsList.forEach(pokemon => {
          this.getPokemonData(pokemon);
        });
      },
      (error) => {
        console.error('Error fetching Pokemon list', error);
      }
    );
  }

  getPokemonData(pokemon: {name: string, url: string}): void {
    this.pokemonDataService.getPokemonData(pokemon.url).subscribe(
      (data: any) => {
        // console.log(data);
        const newPokemon: Pokemon = {
          id: data.id,
          name: data.name,
          img: data.sprites.front_default,
          type: data.types[0].type.name,
          color: data.color, 
          abilities: data.abilities.map((ability: {ability:{name: string, url: string}}) => ability.ability.name),
        };
        console.log(newPokemon)
        this.pokemons.push(newPokemon);
      },
      (error) => {
        console.error(`Error fetching data for ${pokemon.name}`, error);
      }
    );
  }
}
