import { Component, OnInit, ViewChild } from '@angular/core';
import { WeatherService } from 'src/app/services/weather.service';
import * as moment from 'moment';
import { AddressService } from 'src/app/services/address.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';

declare var google: any;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  updateMap: Subject<any> = new Subject();

  cityName: string;
  currentHour: string;
  currentDay: string;
  searchForm: FormGroup;
  weather: any;
  lastTimestamp = moment().format('X');
  location = {};
  math = Math;

  constructor(private weatherService: WeatherService, private addressService: AddressService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    console.log(moment().format('X'))
    this.searchForm = this.formBuilder.group({
      address: ['']
    });

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          
          this.updateMap.next(this.location);
          
          this.addressService.getAddress(this.location).subscribe(
            res => {
              this.cityName = res.results[0].formatted_address;
            }
          )
          this.loadWeather();
        }
      )
    }
    else {
      console.log('Error! Geolocation not enabled!');
    }
  }

  capitalizeFirstLetter(str) {
    let first = str.codePointAt(0);
    let index = first > 0xFFFF ? 2 : 1;
    return String.fromCodePoint(first).toUpperCase() + str.slice(index);;
  }

  timestampToDate(timestamp) {
    let date = moment.unix(timestamp).locale('pt-br');
    this.currentHour = date.format('LT');
    this.currentDay = date.format('dddd');
  }

  setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          
          this.updateMap.next(this.location);
          
          this.addressService.getAddress(this.location).subscribe(
            res => {
              this.cityName = res.results[0].formatted_address;
              this.searchForm.reset();
            }
          )
          this.dateChanged(this.lastTimestamp);
        }
      )
    }
    else {
      console.log('Error! Geolocation not enabled!');
    }
  }

  loadAddress() {
    let address = this.searchForm.get('address').value;

    if (address.length > 0) {
      this.addressService.getLatLng(address).subscribe(
        res => {
          this.location = res.results[0].geometry.location;
          this.updateMap.next(this.location);
          this.cityName = res.results[0].formatted_address;
          this.dateChanged(this.lastTimestamp);
        },
        err => {
          console.log(err);
        }
      )
    }
  }

  dateChanged(timestamp) {
    this.lastTimestamp = timestamp;
    
    if (moment().format('DD-MM-YYYY') == moment.unix(timestamp).format('DD-MM-YYYY')) {
      this.loadWeather();
    }
    else {
      this.loadHistoricalWeather(timestamp);
    }
  }

  loadWeather() {
    this.weatherService.getWeather(this.location).subscribe(
      res => {
        this.weather = res;
        this.timestampToDate(this.weather.current.dt);
      },
      err => {
        console.log(err);
      }
    );
  }

  loadHistoricalWeather(timestamp) {
    this.weatherService.getHistoricalWeather(this.location, timestamp).subscribe(
      res => {
        console.log(res);
        this.weather = res;
        this.timestampToDate(this.weather.current.dt);
      },
      err => {
        console.log(err);
      }
    )
  }
}
