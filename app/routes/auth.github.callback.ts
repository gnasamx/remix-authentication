import type { LoaderFunction } from "@remix-run/node";
import { authenticator } from "~/auth.server";

export const loader: LoaderFunction = async ({ request }) => {
  console.log("==== request", request.url);
  return authenticator.authenticate("github", request, {
    successRedirect: "/private",
    failureRedirect: "/",
  });
};
