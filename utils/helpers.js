import { ClientFunction } from "testcafe";
import { gitHubApiUrl } from "./constants";
import { defaultUser } from "./users";
import { userCustomData } from "../tests/data/userCustomData";
const fetch = require("node-fetch");

export const getCurrentPageUrl = ClientFunction(() => document.location.href);

export const deleteRepo = async () => {
  const response = await fetch(
    `${gitHubApiUrl}repos/${defaultUser.userName}/${userCustomData.repoName}`,
    {
      method: "delete",
      headers: { Authorization: `token ${defaultUser.authToken}` },
    }
  );
  if (response.ok) {
    console.log("Clean up successfully finished");
  } else {
    console.log(
      `Clean up failed with status code ${response.status} and message ${response.statusText}`
    );
  }
};
