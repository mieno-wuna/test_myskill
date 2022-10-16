export class StandardError extends Error {
  constructor(public message: string, public errorCode: number = 400) {
    super();
  }
}
