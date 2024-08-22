import Stock from './Stock';

export default class Portafolio {
  private stocks: Stock[] = [];

  getStocks(): Stock[] {
    return this.stocks;
  }

  addStock(stock: Stock) {
    this.stocks.push(stock);
  }

  profit(startDate: Date, endDate: Date): number {
    return this.calculateProfit(startDate, endDate);
  }

  annualizedReturn(startDate: Date, endDate: Date): number {
    return this.calculateAnnualizedReturn(startDate, endDate);
  }

  private calculateProfit = (startDate: Date, endDate: Date): number => {
    let totalProfit = 0;
    for (const stock of this.stocks) {
      const priceStart = stock.price(startDate);
      const priceEnd = stock.price(endDate);
      const profit = priceEnd - priceStart;
      totalProfit += profit;
    }
    return totalProfit;
  };

  //AnnualizedReturn = (1 + totalPerformance)^(365 / daysDifference) - 1
  private calculateAnnualizedReturn = (startDate: Date, endDate: Date): number => {
    const startValue = this.getPortafolioValueForADate(startDate);
    const endValue = this.getPortafolioValueForADate(endDate);
    const totalPerformance = (endValue - startValue) / startValue;
    const daysDifference = (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24);

    const annualizedReturn = Math.pow(1 + totalPerformance, 365 / daysDifference) - 1;
    return annualizedReturn;
  };

  private getPortafolioValueForADate = (date: Date): number => {
    let totalValue = 0;
    for (const stock of this.stocks) {
      const price = stock.price(date);
      totalValue += price;
    }
    return totalValue;
  };
}
