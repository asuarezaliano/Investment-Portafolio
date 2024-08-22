export interface PricingStrategy {
  getStockPrice(id: number, date: Date): number;
}

export interface StockData {
  id: number;
  name: string;
  initialPrice: number;
  endPrice: number;
}
