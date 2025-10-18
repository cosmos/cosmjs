export class HttpError extends Error {
  public readonly status: number;
  public readonly expose: boolean;

  public constructor(status: number, text: string, expose = true) {
    super(text);
    this.name = "HttpError";
    this.status = status;
    this.expose = expose;
  }
}
