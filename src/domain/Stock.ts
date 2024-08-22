import { PricingStrategy } from '../interface/interface';

export default class Stock {
  private id: number;
  private name: string;
  private pricing: PricingStrategy;

  constructor(id: number, name: string, pricing: PricingStrategy) {
    this.id = id;
    this.name = name;
    this.pricing = pricing;
  }
  getId(): number {
    return this.id;
  }
  getName(): string {
    return this.name;
  }

  price(date: Date): number {
    return this.pricing.getStockPrice(this.id, date);
  }
}
