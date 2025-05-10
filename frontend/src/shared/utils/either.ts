export type Either<F, S> = Failure<F, S> | Success<F, S>;

class Failure<F, S> {
  constructor(public data: F) {}

  isFailure(): this is Failure<F, S> {
    return true;
  }

  isSuccess(): this is Success<F, S> {
    return false;
  }
}

export const failure = <F, S>(data: F) => new Failure<F, S>(data);

class Success<F, S> {
  constructor(public data: S) {}

  isFailure(): this is Failure<F, S> {
    return false;
  }

  isSuccess(): this is Success<F, S> {
    return true;
  }
}

export const success = <F, S>(data: S) => new Success<F, S>(data);
