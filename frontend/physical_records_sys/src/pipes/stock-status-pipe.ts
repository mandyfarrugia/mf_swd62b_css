import { StocksService } from './../services/stocks-service';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stockStatus',
})
export class StockStatusPipe implements PipeTransform {
  constructor(private stocksService: StocksService) {}

  transform(stockQuantity: number | undefined): string | null {
    if(stockQuantity === undefined) return null;
    return this.stocksService.getStatusLabel(stockQuantity);
  }
}
