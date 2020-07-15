import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-week',
  templateUrl: './week.component.html',
  styleUrls: ['./week.component.css']
})
export class WeekComponent implements OnInit {
  @Input() weather;
  math = Math;

  constructor() { }

  ngOnInit(): void {
  }

  timestampToDate(timestamp, format) {
    let date = moment.unix(timestamp).locale('pt-br');

    return date.format(format);
  }

}
