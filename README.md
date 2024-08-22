# Investment-Portafolio

Construct a simple Portfolio class that has a collection of Stocks and a "Profit" method that receives 2
dates and returns the profit of the Portfolio between those dates. Assume each Stock has a "Price" method
that receives a date and returns its price. Bonus Track: make the Profit method return the "annualized
return" of the portfolio between the given dates.

Here I created the Investment Portafolio using Typescript.

## How to run

```bash
npm install
npm run dev
```

## Adding Stocks

You can add any number of stocks to the portfolio. For each stock, specify:

1. The stock symbol (e.g., "AAPL")
2. The initial price
3. The final price

The portfolio will use these values to calculate the profit and annualized return.

Example:

```typescript
const stocks: Stock[] = [
  new Stock("AAPL", 100, 105),
  new Stock("MSFT", 200, 210),
  new Stock("GOOG", 1500, 1600),
];

## Design Approach

I implemented a `PricingStrategy` interface that is used to calculate the stock price within the `Stock` class. 
This approach was chosen for the following reasons:

1. Flexibility: It allows for easy interchangeability of pricing calculation strategies at the run time.
2. Extensibility: If we need to implement a new way of calculating prices, we only need to create a new strategy that encapsulates the pricing logic.
3. Modularity: We can use different calculation methods for different stocks within the same portfolio.

This implementation leverages the Strategy pattern and adheres to the Open/Closed Principle (the 'O' in SOLID). This means our code is open for 
extension but closed for modification, allowing us to add new functionality without altering existing code.

By using this design, we can easily add new pricing strategies in the future without modifying the core `Stock` or `Portfolio` classes, making our 
codebase more maintainable and adaptable to changing requirements.