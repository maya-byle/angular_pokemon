import { Component, Input } from '@angular/core';
import { Pokemon } from '../../app/interfaces/pokemon.interface';

@Component({
  selector: 'pokemon-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() pokemon: Pokemon;
}