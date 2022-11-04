import type { ActionFunction } from "@remix-run/node";
import { authenticator } from "~/auth.server";


export const action: ActionFunction = async ({ request }) => {
  return await authenticator.authenticate("github", request, {
    successRedirect: "/private",
    failureRedirect: "/",
  });
};
