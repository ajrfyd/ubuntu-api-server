import path from 'path';
import { fileURLToPath } from 'url';
export { default as errorHandler } from "./errorHandler.js";

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(path.join(__filename, "../../../"));
export const { log } = console;

export class Err extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  };
};

export class DatabaseError extends Err {
  constructor(message: string) {
    super(message);
  }
};

class E extends Error {
  constructor(public status: number, public message: string) {
    super(message);
    this.status = status;
    this.message = message;
  }
};
