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
  @Input('pokemonTypes') types: string[] = [];
  @Output() filteredPokemonsListChange = new EventEmitter<Pokemon[]>();

  selectedType: string = "any"; 
  isDropdownOpen: boolean = false;

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  onTypeChange(type: string, inputElement: HTMLInputElement): void {
    this.selectedType = type;
    this.toggleDropdown();
    this.filterResults(inputElement);
  }

  filterResults(inputElement: HTMLInputElement): void{
    const value = inputElement.value;
    if (!value || !this.filteredPokemonsList) {
      this.filteredPokemonsList = [...this.pokemons];
      // return;
    }
    this.filteredPokemonsList = this.pokemons.filter(pokemon => {
      return (
        (!value || pokemon.name.toLowerCase().includes(value.toLowerCase())) &&
        (this.selectedType === 'any' || pokemon.type === this.selectedType)
      );
    });
    this.filteredPokemonsListChange.emit(this.filteredPokemonsList);
  }
}
