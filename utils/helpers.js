import zlib from "zlib";
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

async function unzipResponseBody(t, options) {
  return new Promise((resolve, reject) => {
    zlib.gunzip(options.body, async (error, buff) => {
      if (error !== null) {
        return reject(error);
      }
      if (options.toJson === true) {
        return resolve(JSON.parse(buff.toString()));
      } else if (options.toString === true) {
        return resolve(buff.toString());
      } else {
        return resolve(buff);
      }
    });
  });
}
async function convertBufferBodyToString(t, options) {
  return new Promise((resolve, reject) => {
    return resolve(JSON.parse(options.body.toString()));
  });
}

export async function convertLoggerResponses(t, options) {
  let requests = options.requestLogger.requests;

  try {
    return Promise.all(
      requests.map(async (value, key) => {
        if (
          value.response &&
          value.response.headers &&
          Buffer.isBuffer(value.response.body)
        ) {
          if (value.response.headers["content-encoding"] === "gzip") {
            requests[key].response.body = await unzipResponseBody(t, {
              body: value.response.body,
              toJson: options.toJson,
              toString: options.toString,
            });
          } else {
            requests[key].response.body = await convertBufferBodyToString(t, {
              body: value.response.body,
              toJson: options.toJson,
              toString: options.toString,
            });
          }
        }
      })
    );
  } catch (er) {
    throw new Error(er);
  }
}
