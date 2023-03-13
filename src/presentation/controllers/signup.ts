import { InvalidParamError, MissingParamError } from "../errors";
import { badRequest, serverError } from "../helpers/http-helper";
import {
  Controller,
  EmailValidator,
  HttpRequest,
  HttpResponse,
} from "../protocols";

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator;

  constructor(emailValidator: EmailValidator) {
    this.emailValidator = emailValidator;
  }

  public handle(httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredFields = [
        "name",
        "email",
        "password",
        "password_confirmation",
      ];

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field));
        }
      }

      if (
        httpRequest.body.password !== httpRequest.body.password_confirmation
      ) {
        return badRequest(new InvalidParamError("password_confirmation"));
      }

      if (!this.emailValidator.isValid(httpRequest.body.email)) {
        return badRequest(new InvalidParamError("email"));
      }
    } catch (error) {
      return serverError();
    }
  }
}
