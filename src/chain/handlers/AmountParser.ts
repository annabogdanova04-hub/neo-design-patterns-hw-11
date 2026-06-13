import { AbstractHandler } from "../AbstractHandler";

export class AmountParser extends AbstractHandler {
  protected process(record: any): any {
    const amount =
      typeof record.amount === "string"
        ? parseFloat(record.amount)
        : record.amount;
    if (isNaN(amount)) throw new Error("Invalid amount");
    return { ...record, amount };
  }
}
