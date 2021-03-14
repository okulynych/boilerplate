import { userCustomData } from "../data/userCustomData";
import { defaultUser } from "../../utils/users";
import { gitHubApiUrl } from "../../utils/constants";

const frisby = require("frisby");

frisby.globalSetup({
  request: {
    headers: { Authorization: `token ${defaultUser.authToken}` },
  },
});

it("User should create new repo", () => {
  const data = {
    name: userCustomData.repoName,
    description: userCustomData.repoDescription,
    auto_init: userCustomData.repoAutoInit,
  };
  return frisby
    .post(`${gitHubApiUrl}user/repos`, data)
    .expect("status", 201)
    .then(() => {
      return frisby
        .get(
          `${gitHubApiUrl}repos/${defaultUser.userName}/${userCustomData.repoName}`
        )
        .expect("status", 200)
        .then((response) => {
          expect(response.json.name).toBe(userCustomData.repoName);
        });
    });
});

it("User should create new branch", () => {
  return frisby
    .get(
      `${gitHubApiUrl}repos/${defaultUser.userName}/${userCustomData.repoName}` +
        `/git/ref/heads/${userCustomData.defaultBranchName}`
    )
    .expect("status", 200)
    .then((response) => {
      const sha = response.json.object.sha;
      const data = { ref: `refs/heads/${userCustomData.branchName}`, sha: sha };
      return frisby
        .post(
          `${gitHubApiUrl}repos/${defaultUser.userName}/${userCustomData.repoName}/git/refs`,
          data
        )
        .expect("status", 201)
        .then(() => {
          return frisby
            .get(
              `${gitHubApiUrl}repos/${defaultUser.userName}/${userCustomData.repoName}` +
                `/git/matching-refs/heads/${userCustomData.branchName}`
            )
            .expect("status", 200)
            .then((response) => {
              expect(response.json[0].ref).toBe(
                `refs/heads/${userCustomData.branchName}`
              );
            });
        });
    });
});

it("User should commit file into branch", () => {
  return frisby
    .get(
      `${gitHubApiUrl}repos/${defaultUser.userName}/${userCustomData.repoName}` +
        `/contents/${userCustomData.fileName}?ref=${userCustomData.branchName}`
    )
    .expect("status", 404)
    .then(() => {
      return frisby
        .get(
          `${gitHubApiUrl}repos/${defaultUser.userName}/` +
            `${userCustomData.repoName}/commits/${userCustomData.branchName}`
        )
        .then((response) => {
          const sha = response.json.sha;
          const byte_array = [...Buffer.from(userCustomData.fileContent)];
          const base64content = btoa(String.fromCharCode(...byte_array));
          const message = {
            message: userCustomData.commitMessage,
            branch: userCustomData.branchName,
            content: base64content,
            sha: sha,
          };
          return frisby
            .put(
              `${gitHubApiUrl}repos/${defaultUser.userName}` +
                `/${userCustomData.repoName}/contents/${userCustomData.fileName}`,
              message
            )
            .expect("status", 201);
        });
    });
});

it("User should create new PR", () => {
  const data = {
    title: userCustomData.pullRequestTitle,
    head: `${defaultUser.userName}:${userCustomData.branchName}`,
    base: userCustomData.defaultBranchName,
  };
  return frisby
    .post(
      `${gitHubApiUrl}repos/${defaultUser.userName}/${userCustomData.repoName}/pulls`,
      data
    )
    .expect("status", 201)
    .then(() => {
      return frisby
        .get(
          `${gitHubApiUrl}repos/${defaultUser.userName}/${userCustomData.repoName}/pulls`
        )
        .expect("status", 200)
        .then((response) => {
          expect(response.json[0].title).toBe(userCustomData.pullRequestTitle);
        });
    });
});

it("User should delete repo", () => {
  return frisby
    .del(
      `${gitHubApiUrl}repos/${defaultUser.userName}/${userCustomData.repoName}`
    )
    .expect("status", 204)
    .then(() => {
      return new Promise((resolve, reject) => {
        setTimeout(resolve, 3000);
      });
    })
    .then(() => {
      return frisby
        .get(
          `${gitHubApiUrl}repos/${defaultUser.userName}/${userCustomData.repoName}`
        )
        .expect("status", 404);
    });
});
