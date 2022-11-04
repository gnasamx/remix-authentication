import { sessionStorage } from "~/session.server";
import {
  Authenticator,
  AuthorizationError,
  FormStrategy,
  OAuth2Strategy,
} from "./lib/remix-auth";

export let authenticator = new Authenticator<string>(sessionStorage);
const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, BASE_URL } = process.env;

authenticator
  .use(
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
  )
  .use(
    new OAuth2Strategy(
      {
        authorizationURL: "https://github.com/login/oauth/authorize",
        tokenURL: "https://github.com/login/oauth/access_token",
        clientID: GITHUB_CLIENT_ID!,
        clientSecret: GITHUB_CLIENT_SECRET!,
        callbackURL: new URL("/auth/github/callback", BASE_URL).toString(),
      },
      async ({ profile }) => {
        return profile;
      }
    ),
    "github"
  );
