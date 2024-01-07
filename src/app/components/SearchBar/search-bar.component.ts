import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pokemon } from '../../interfaces/pokemon.interface';

@Component({
  selector: 'search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {
  @Input() pokemons: Pokemon[] = [];
  @Input() filteredPokemonsList: Pokemon[] = [];
  @Output() filteredPokemonsListChange = new EventEmitter<Pokemon[]>();

  selectedFilter: string = "name"; 

  filterResults(event: Event, selectedFilter: string) {
    const value = (<HTMLInputElement>event.target).value
    console.log(value)
    if (!value || !this.filteredPokemonsList) {
      this.filteredPokemonsList = [...this.pokemons];
      return;
    }
    this.filteredPokemonsList = this.pokemons.filter(
      pokemon => {
        return selectedFilter === "name" ? 
          pokemon.name.includes(value.toLowerCase()) :
          pokemon.type.includes(value.toLowerCase()) 
      }
    )
    this.filteredPokemonsListChange.emit(this.filteredPokemonsList);
  }
}
