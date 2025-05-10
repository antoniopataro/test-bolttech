import { Mutex } from "./mutex";

export class TransactionManager {
  private static instance: TransactionManager;
  private mutex: Mutex;

  private constructor() {
    this.mutex = new Mutex();
  }

  public static getInstance(): TransactionManager {
    if (!TransactionManager.instance) {
      TransactionManager.instance = new TransactionManager();
    }

    return TransactionManager.instance;
  }

  public async execute<T>(operation: () => Promise<T>): Promise<T> {
    await this.mutex.lock();
    try {
      const result = await operation();
      return result;
    } finally {
      this.mutex.unlock();
    }
  }
}
