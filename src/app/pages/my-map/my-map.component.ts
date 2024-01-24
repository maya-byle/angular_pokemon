import { Component, OnInit } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';
import { environment } from '../../../environments/environment';
@Component({
  selector: 'my-map',
  templateUrl: './my-map.component.html',
  styleUrl: './my-map.component.css',
})
export class MyMapComponent implements OnInit {
  moveoAddress: { lat: number; lng: number } = { lat: 32.064, lng: 34.773 };
  selectedMode: string = 'none';

  map: google.maps.Map;
  autocomplete: google.maps.places.Autocomplete;
  directionsService: google.maps.DirectionsService;
  directionsRenderer: google.maps.DirectionsRenderer;

  ngOnInit(): void {
    let loader = new Loader({
      apiKey: environment.GOOGLE_MAPS_API_KEY,
      libraries: ['places'],
    });

    loader.load().then(() => {
      this.map = new google.maps.Map(document.getElementById('map'), {
        center: this.moveoAddress,
        zoom: 15,
        mapId: 'a088bb11f10500af',
      });

      new google.maps.Marker({
        map: this.map,
        position: this.moveoAddress,
        title: 'Moveo-alpha',
      });

      this.autocomplete = new google.maps.places.Autocomplete(
        document.getElementById('autocomplete') as HTMLInputElement,
        {
          types: ['establishment'],
          componentRestrictions: { country: ['IL'] },
          fields: ['place_id', 'geometry', 'name'],
        }
      );

      this.directionsService = new google.maps.DirectionsService();
      this.directionsRenderer = new google.maps.DirectionsRenderer();

      this.autocomplete.addListener('place_changed', () =>
        this.onPlaceChanged()
      );
      this.directionsRenderer.setMap(this.map);
    });
  }

  onPlaceChanged() {
    const place = this.autocomplete.getPlace();
    if (![place.geometry]) {
      document.getElementById('autocomplete').ariaPlaceholder = 'Enter a place';
    } else {
      new google.maps.Marker({
        map: this.map,
        position: place.geometry.location,
        title: place.name,
      });
    }
  }

  calcRoute() {
    const selectedMode = this.selectedMode;
    const start = { lat: 32.146908, lng: 34.837891 };

    if (selectedMode === 'CLEAR') {
      this.selectedMode = 'none';
      this.directionsRenderer.setMap(null);
      return;
    }

    const chosenMode = google.maps.TravelMode[selectedMode];
    const request = {
      origin: start,
      destination: this.moveoAddress,
      travelMode: chosenMode,
    };

    this.directionsService.route(request, (result, status) => {
      if (status == 'OK') {
        this.directionsRenderer.setDirections(result);
        this.directionsRenderer.setMap(this.map);
      } else {
        console.error('Directions request failed with status:', status);
      }
    });
  }
}
