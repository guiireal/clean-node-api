import { ServerError } from "../errors";
import { HttpResponse } from "../protocols/http";

export function badRequest(error: Error): HttpResponse {
  return {
    status_code: 400,
    body: error,
  };
}

export function serverError(): HttpResponse {
  return {
    status_code: 500,
    body: new ServerError(),
  };
}

export function ok(data: any): HttpResponse {
  return {
    status_code: 200,
    body: data,
  };
}
