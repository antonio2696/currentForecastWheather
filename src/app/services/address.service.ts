import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  apiKey = 'AIzaSyDIIjKLdbFQtoSthDGDVuOvu1TsZboLhY0';

  constructor(private http: HttpClient) { }

  getLatLng(address): Observable<any> {
    return this.http.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${this.apiKey}`);
  }

  getAddress(location): Observable<any> {
    return this.http.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${this.apiKey}`);
  }
}
