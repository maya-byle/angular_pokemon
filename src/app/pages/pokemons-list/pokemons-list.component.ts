import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../../interfaces/pokemon.interface';
import { PokemonDataService } from '../../services/pokemon-data.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-pokemons-list',
  templateUrl: './pokemons-list.component.html',
  styleUrl: './pokemons-list.component.scss'
})
export class PokemonsListComponent implements OnInit {
  pokemons: Pokemon[] = [];
  selectedPokemon: Pokemon = null;
  filteredPokemonsList: Pokemon[] = [];
  pokemonTypes: Set<string> = new Set<string>();

  constructor(
    private PokemonDataService: PokemonDataService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getPokemonList();
    this.pokemonTypes.add('any');
  }

  async getPokemonList(): Promise<void> {
    this.PokemonDataService.getPokemonList().subscribe(
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
    this.PokemonDataService.getPokemonData(pokemon.url).subscribe(
      (data: any) => {
        const newPokemon: Pokemon = {
          id: data.id,
          name: data.name,
          img: data.sprites.front_default,
          type: data.types[0].type.name,
          height: data.height, 
          abilities: data.abilities.map((ability: {ability:{name: string, url: string}}) => ability.ability.name),
        };
        this.pokemons.push(newPokemon);
        this.filteredPokemonsList.push(newPokemon) // At the beginning, the list should contain all the Pokémon.
        this.pokemonTypes.add(newPokemon.type);
      },
      (error) => {
        console.error(`Error fetching data for ${pokemon.name}`, error);
      }
    );
  }

  selectCard(pokemon: Pokemon) {
    console.log(pokemon.name)
    this.selectedPokemon = pokemon;
  }

  handleLogout() {
    this.authService.remove();
    this.router.navigate(['/']);
  }
}