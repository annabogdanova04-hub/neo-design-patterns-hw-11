import { AbstractHandler } from "../AbstractHandler";
import { TimestampParser } from "../handlers/TimestampParser";
import { LevelValidator } from "../handlers/LevelValidator";
import { MessageTrimmer } from "../handlers/MessageTrimmer";

export function buildSystemErrorChain(): AbstractHandler {
  const ts = new TimestampParser();
  const level = new LevelValidator();
  const message = new MessageTrimmer();
  ts.setNext(level).setNext(message);
  return ts;
}