import { sessionStorage } from "~/session.server";
import {
  Authenticator,
  AuthorizationError,
  FormStrategy,
} from "./lib/remix-auth";

export let authenticator = new Authenticator<string>(sessionStorage);

authenticator.use(
  new FormStrategy(async ({ form }) => {
    let email = form.get("email");
    let password = form.get("password");

    if (!password) throw new AuthorizationError("Password is required");
    if (password != "test") {
      throw new AuthorizationError("Invalid credentials");
    }
    if (!email) throw new AuthorizationError("Email is required");

    return email as string;
  })
);
