import * as fs from "fs/promises";
import { DataRecord } from "./models/DataRecord";
import { buildAccessLogChain } from "./chain/chains/AccessLogChain";
import { buildTransactionChain } from "./chain/chains/TransactionChain";
import { buildSystemErrorChain } from "./chain/chains/SystemErrorChain";
import { ProcessingMediator } from "./mediator/ProcessingMediator";

const handlerMap = {
  access_log: buildAccessLogChain,
  transaction: buildTransactionChain,
  system_error: buildSystemErrorChain,
};

async function main() {
  const raw = await fs.readFile("src/data/records.json", "utf-8");
  const records: DataRecord[] = JSON.parse(raw);

  const mediator = new ProcessingMediator();

  for (const record of records) {
    const buildChain = handlerMap[record.type];

    if (!buildChain) {
      mediator.onRejected(record, `Unknown record type: ${record.type}`);
      continue;
    }

    try {
      const chain = buildChain();
      const processed = chain.handle(record);
      mediator.onSuccess(processed);
    } catch (error: any) {
      mediator.onRejected(record, error.message);
    }
  }

  await mediator.finalize(records.length);
}

main();
