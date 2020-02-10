export class HttpError extends Error {
  constructor(public readonly status: number, text: string, public readonly expose: boolean = true) {
    super(text);
  }
}
