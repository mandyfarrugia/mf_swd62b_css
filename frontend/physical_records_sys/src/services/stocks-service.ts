import { Injectable } from '@angular/core';
import { StockStatusKey } from '../types/stock-status-key-types';
import { StockStatusValue } from '../types/stock-status-value-types';

@Injectable({
  providedIn: 'root',
})
export class StocksService {
  private readonly statusRecords: Record<StockStatusKey, StockStatusValue> = {
    out: { label: 'Out of stock', cssClass: 'badge bg-danger' },
    low: { label: 'Low in stock', cssClass: 'badge bg-warning' },
    in: { label: 'In stock', cssClass: 'badge bg-success' }
  }

  private getKey(stockQuantity: number) : StockStatusKey {
    return stockQuantity === 0 ? 'out' : stockQuantity <= 5 ? 'low' : 'in';
  }

  public getCssClass(stockQuantity: number) : string | null {
    if(stockQuantity === undefined) return null;
    const keyByStockQuantity: StockStatusKey = this.getKey(stockQuantity);
    return this.statusRecords[keyByStockQuantity].cssClass;
  }

  public getStatusLabel(stockQuantity: number) : string | null {
    if(stockQuantity === undefined) return null;
    const keyByStockQuantity: StockStatusKey = this.getKey(stockQuantity);
    return this.statusRecords[keyByStockQuantity].label;
  }
}
