export interface ErrorWithStatus extends Error {
  statusCode: number;
  code?: number;
}
