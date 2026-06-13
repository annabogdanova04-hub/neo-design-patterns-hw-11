import { AbstractHandler } from "../AbstractHandler";

export class CurrencyNormalizer extends AbstractHandler {
  protected process(record: any): any {
    if (!record.currency || record.currency.trim() === "") {
      throw new Error("Missing currency");
    }
    return { ...record, currency: record.currency.toUpperCase() };
  }
}