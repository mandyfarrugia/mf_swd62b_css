import { Pipe, PipeTransform } from '@angular/core';
import { StockStatusKey } from '../types/stock-status-key-types';
import { StockStatusValue } from '../types/stock-status-value-types';
import { retry } from 'rxjs';

@Pipe({
  name: 'stockStatus',
})
export class StockStatusPipe implements PipeTransform {
  constructor() {
  }
  
  private readonly statusRecords: Record<StockStatusKey, StockStatusValue> = {
    out: { label: 'Out of stock', cssClass: 'badge bg-danger' },
    low: { label: 'Low in stock', cssClass: 'badge bg-warning' },
    in: { label: 'In stock', cssClass: 'badge bg-success' }
  }

  transform(stockQuantity: number | undefined): string | null {
    if(stockQuantity === undefined) return null;
    const keyByStockQuantity = stockQuantity === 0 ? 'out' : stockQuantity <= 5 ? 'low' : 'in';
    return this.statusRecords[keyByStockQuantity].label;
  }
}
