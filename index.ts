import Portfolio from './src/domain/Portafolio';
import { getStocks } from './src/utils/helpers';
import Stock from './src/domain/Stock';
import { startDate, endDate } from './src/utils/const';
import { addStockToJson } from './src/utils/helpers';
import { JsonPricingStrategy } from './src/domain/JsonPricingStrategy';

async function main() {
  const portfolio = new Portfolio();

  await addStockToJson();

  const stocksData = getStocks();

  for (const stock of stocksData) {
    portfolio.addStock(new Stock(stock.id, stock.name, new JsonPricingStrategy()));
  }

  const profit = portfolio.profit(startDate, endDate);
  console.log('Profit:', profit);

  const annualizedReturn = portfolio.annualizedReturn(startDate, endDate);
  console.log('Annualized Return:', annualizedReturn);
}

main();
