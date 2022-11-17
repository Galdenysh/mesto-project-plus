export const BAD_REQUEST = 400;
export const UNAUTHORIZED = 401;
export const NOT_FOUND = 404;
export const LOCKED = 423;
export const ITERNAL_SERVER_ERROR = 500;

export function newError(name: string, message: string) {
  const e = new Error(message);
  e.name = name;

  return e;
}
