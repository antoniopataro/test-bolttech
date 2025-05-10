/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */

class Logger {
  public error(error: any): void {
    const payload: any = {
      "@timestamp": new Date().toISOString(),
      level: "error",
    };

    if (error instanceof Error) {
      payload.message = error.message;
    } else if (typeof error === "string") {
      payload.message = error;
    } else {
      payload.data = error;
    }

    console.log(JSON.stringify(payload));
  }

  public info(message: string): void {
    const payload: any = {
      "@timestamp": new Date().toISOString(),
      level: "info",
      message,
    };

    console.log(JSON.stringify(payload));
  }
}

export const logger = new Logger();
