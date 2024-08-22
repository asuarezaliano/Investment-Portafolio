import { PricingStrategy } from '../interface/interface';
import { startDate } from '../utils/const';
import { loadStockData } from '../utils/helpers';

export class JsonPricingStrategy implements PricingStrategy {
  getStockPrice(id: number, date: Date): number {
    const stocksValues = loadStockData();

    const stock = stocksValues.find((stock) => stock.id === id);
    if (!stock) {
      throw new Error(`Failed to fetch stock price for ID ${id} on date ${date}`);
    }

    if (date.getTime() === startDate.getTime()) {
      return stock.initialPrice;
    }
    return stock.endPrice;
  }
}
