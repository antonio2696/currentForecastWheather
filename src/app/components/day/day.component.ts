import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { WeatherService } from 'src/app/services/weather.service';
import * as moment from 'moment';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.css']
})
export class DayComponent implements OnInit {
  @Input() weather;
  @Output('dateChanged') dateChanged = new EventEmitter;
  dateMax;
  dateMin;
  today;
  math = Math;

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    let date = new Date;
    this.today = moment(date).format('YYYY-MM-DD');
    this.dateMin = moment(date).subtract(5, 'days').format('YYYY-MM-DD');
    this.dateMax = this.today;
  }

  timestampToDate(timestamp, format) {
    let date = moment.unix(timestamp).locale('pt-br');
    return date.format(format);
  }

  changeDate(date) {
    this.dateChanged.emit(moment(date).format('X'));
  }
}
