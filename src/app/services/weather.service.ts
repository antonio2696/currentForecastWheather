import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  apiKey = '360144d1d3f59382f45ea3ca86b227b3'

  constructor(private http: HttpClient) { }

  getWeather(location): Observable<any> {
    return this.http.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${location.lat}&lon=${location.lng}&appid=${this.apiKey}&units=metric&lang=pt_br`);
  }

  getHistoricalWeather(location, timestamp): Observable<any> {
    return this.http.get(`https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${location.lat}&lon=${location.lng}&dt=${timestamp}&appid=${this.apiKey}&units=metric&lang=pt_br`);
  }

  getWindMap(): Observable<any> {
    return this.http.get(`https://tile.openweathermap.org/map/wind_new/8/0/0.png?appid=${this.apiKey}`)
  }
}
