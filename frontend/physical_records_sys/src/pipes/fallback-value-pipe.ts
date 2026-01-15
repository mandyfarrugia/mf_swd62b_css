import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fallbackValue',
})
export class FallbackValuePipe implements PipeTransform {
  transform(value: string): string {
    return (!value) ? "No data found!" : value;
  }
}
