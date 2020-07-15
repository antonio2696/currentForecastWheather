import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fahrenheitConverter'
})
export class FahrenheitConverterPipe implements PipeTransform {

  transform(temp): number {
    return Math.round((temp * 9/5) + 32);
  }

}
