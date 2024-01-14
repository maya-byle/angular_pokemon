import { Component, OnInit } from '@angular/core';
import { Loader } from "@googlemaps/js-api-loader"

@Component({
  selector: 'my-map',
  templateUrl: './my-map.component.html',
  styleUrl: './my-map.component.css'
})
export class MyMapComponent implements OnInit {
  moveoAddress: {lat: number, lng: number} = { lat: 32.064, lng: 34.773 };
  details: {} = null;
  selectedMode: string = 'DRIVING';

  map: google.maps.Map; 
  autocomplete: google.maps.places.Autocomplete
  directionsService: google.maps.DirectionsService;
  directionsRenderer: google.maps.DirectionsRenderer;

  ngOnInit(): void {
    let loader = new Loader({
      apiKey: "AIzaSyCk24I_i4Ls-XSGEdX3XD-ws3s9xOvpTxE",
      libraries: ['places']
    })

    loader.load().then(() => {
      this.map = new google.maps.Map(document.getElementById("map"), {
        center: this.moveoAddress,
        zoom: 15,
        mapId: 'a088bb11f10500af'
      });

      new google.maps.Marker({
        map: this.map,
        position: this.moveoAddress,
        title: 'Moveo-alpha'
      });

      this.autocomplete = new google.maps.places.Autocomplete(document.getElementById("autocomplete") as HTMLInputElement, {
        types: ["establishment"],
        componentRestrictions: {'country': ['IL']},
        fields: ['place_id', 'geometry', 'name']
      });

      this.directionsService = new google.maps.DirectionsService();
      this.directionsRenderer = new google.maps.DirectionsRenderer();

      this.autocomplete.addListener('place_changed', () => this.onPlaceChanged());
      this.directionsRenderer.setMap(this.map);
    })
  }

  onPlaceChanged() {
    var place = this.autocomplete.getPlace();
    console.log(place)

    if(![place.geometry]) {
      document.getElementById("autocomplete").ariaPlaceholder = 'Enter a place';
    } else {
      new google.maps.Marker({
        map: this.map,
        position: place.geometry.location,
        title: place.name
      });
    }
  }

  calcRoute() {
    var selectedMode = this.selectedMode;
    // const start = new google.maps.LatLng(32.146908, 34.837891);
    const start = { lat:32.146908, lng: 34.837891}
    const request = {
      origin: start,
      destination: this.moveoAddress,
      travelMode: google.maps.TravelMode[selectedMode],
    };
    this.directionsService.route(request, (result, status) => {
      if (status == 'OK') {
        this.directionsRenderer.setDirections(result);
      }
    });
  }

}
