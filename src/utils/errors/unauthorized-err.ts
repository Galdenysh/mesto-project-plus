export default class UnauthorizedError extends Error {
  statusCode: number;

  constructor(message: string | undefined) {
    super(message);
    this.statusCode = 401;
  }
}
