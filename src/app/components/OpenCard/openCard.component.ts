import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pokemon } from '../../interfaces/pokemon.interface';

@Component({
  selector: 'open-card',
  templateUrl: './openCard.component.html',
  styleUrls: ['./openCard.component.scss']
})
export class OpenCardComponent {
  @Input() pokemon: Pokemon
  @Output() selectedPokemonChange = new EventEmitter<Pokemon>();

  onCloseCard() { 
    this.selectedPokemonChange.emit(null);
  }
}
