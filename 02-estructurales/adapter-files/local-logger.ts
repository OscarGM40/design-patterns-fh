import { COLORS } from "../../helpers/colors.ts";

export class LocalLogger {
  constructor(private file: string) {}
  writeLog(message: string): void {
    console.log(`[${this.file} log] ${message}`);
  }
  writeError(message: string): void {
    console.log(`[${this.file} error] %c${message}`, COLORS.red);
  }
  writeWarning(message: string): void {
    console.log(`[${this.file} warning] %c${message}`, COLORS.orange);
  }
}
