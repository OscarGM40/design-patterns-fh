import { Logger } from "jsr:@deno-library/logger";

// const logger = new Logger();

// logger.info("");
// logger.warn("");
// logger.error("");

// el name es importante ser concreto, ya sabemos que es un adaptador para el logger de Deno. Incluso sería mejor especificar el from y el to
export class DenoLoggerAdapter implements ILoggerAdapter {
  // es clave usar composición y no exponer la dependencia tmb, no queremos esto. Podriamos haber usado inyección tmb, pero entiendo que la inyección ganaría al trabajar con abstracciones, como sabemos la concrección nos vale por composicion. Fijate que hay delegación de trabajo al objeto logger, tal como promete el patrón
  private logger = new Logger();
  constructor(public readonly file: string) {}

  writeLog(message: string) {
    return this.logger.info(`[${this.file} log] ${message}`);
  }
  writeError(message: string) {
    return this.logger.error(`[${this.file} error] ${message}`);
  }
  writeWarning(message: string) {
    return this.logger.warn(`[${this.file} warning] ${message}`);
  }
}

interface ILoggerAdapter {
  readonly file: string;
  writeLog: (message: string) => void;
  writeError: (message: string) => void;
  writeWarning: (message: string) => void;
}