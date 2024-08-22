import { createInterface } from 'readline/promises';
import { writeFile } from 'fs/promises';
import { StockData } from '../interface/interface';
import fs from 'fs';
import path from 'path';

export async function addStockToJson(): Promise<void> {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  try {
    console.log('Welcome to the Investment Portafolio');
    console.log('\n');
    console.log('Add the stocks and the initial and final price');

    const stocks: StockData[] = [];
    let continueAdding = true;

    while (continueAdding) {
      console.log('\nEnter stock details (or type "exit" to finish):');
      const stockName = await rl.question('Enter the stock name: ');

      if (stockName.toLowerCase() === 'exit') {
        continueAdding = false;
        continue;
      }

      if (!stockName || stockName.trim() === '') {
        console.log('Stock name cannot be empty. Please enter a valid name.');
        continue;
      }

      const existingStock = stocks.find((stock) => stock.name.toLowerCase() === stockName.toLowerCase());
      if (existingStock) {
        console.log(`Stock "${stockName}" already exists. Please use a different name.`);
        continue;
      }

      const initialPrice = parseFloat(await rl.question('Enter the initial price: '));
      const finalPrice = parseFloat(await rl.question('Enter the final price: '));

      if (isNaN(initialPrice) || isNaN(finalPrice)) {
        console.log('Invalid price input. Please enter numeric values.');
        continue;
      }

      const id = stocks.length + 1;
      stocks.push({ id: id, name: stockName, initialPrice, endPrice: finalPrice });
      console.log(`Stock "${stockName}" added successfully with ID: ${id}.`);
    }

    console.log('\n');

    if (stocks.length === 0) {
      console.log('No stocks were added. Exiting...');
      return;
    }

    await writeFile('stocks.json', JSON.stringify(stocks, null, 2));
  } catch (error) {
    console.error('An error occurred:', (error as Error).message);
  } finally {
    rl.close();
  }
}

export function loadStockData(): StockData[] {
  const filePath = path.join(__dirname, '../..', 'stocks.json');
  const rawData = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(rawData);
}

export const getStocks = (): StockData[] => {
  return loadStockData();
};
