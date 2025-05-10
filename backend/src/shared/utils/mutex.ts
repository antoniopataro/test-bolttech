export class Mutex {
  private _locked = false;
  private _waiters: (() => void)[] = [];

  //

  public lock(): Promise<void> {
    return new Promise((resolve) => {
      if (!this._locked) {
        this._locked = true;

        resolve();
      } else {
        this._waiters.push(resolve);
      }
    });
  }

  public unlock(): void {
    if (this._waiters.length > 0) {
      const next = this._waiters.shift();

      if (next) {
        next();
      }
    } else {
      this._locked = false;
    }
  }
}
