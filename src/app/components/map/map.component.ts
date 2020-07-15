import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import * as L from 'leaflet';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  @Input() location;
  @Input() updateMap: Subject<any>;
  map;
  showMap = false;

  constructor() { }

  ngOnInit(): void {
    this.updateMap.subscribe((event) => {
      this.changeMapCenter(event)
    });

    this.initMap();
  }

  ngOnDestroy() {
    this.updateMap.unsubscribe();
  }

  initMap() {
    this.map = L.map('map').setView([this.location.lat, this.location.lng], 7);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.map);

    L.tileLayer('https://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=360144d1d3f59382f45ea3ca86b227b3', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://openweathermap.org/">OpenWeatherAPI</a>'
    }).addTo(this.map);

    this.showMap = true;
  }

  changeMapCenter(newLocation) {
    this.map.flyTo([newLocation.lat, newLocation.lng], 7);
  }
}
