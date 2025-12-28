import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stockStatus',
})
export class StockStatusPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }
}
