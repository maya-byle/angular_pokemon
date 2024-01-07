import { Component, Input } from '@angular/core';
import { Pokemon } from '../../interfaces/pokemon.interface';

@Component({
  selector: 'open-card',
  templateUrl: './openCard.component.html',
  styleUrls: ['./openCard.component.scss']
})
export class OpenCardComponent {
  @Input() pokemon: Pokemon
  @Input() closeCard: () => void;

  onCloseCard() {
    this.closeCard();
  }
}
