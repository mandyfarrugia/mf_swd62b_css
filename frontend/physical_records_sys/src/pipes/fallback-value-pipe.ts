import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fallbackValue',
})
export class FallbackValuePipe implements PipeTransform {
  transform(value: string): string {
    if(!value) {
      return "No data found!";
    }

    return value;
  }
}
