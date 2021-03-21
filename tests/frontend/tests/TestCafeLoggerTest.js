import { testCafePageUrl, testCafeApiUrl } from "../../../utils/constants";
import { convertLoggerResponses } from "../../../utils/helpers";
import { RequestLogger } from "testcafe";

const logger = RequestLogger(testCafeApiUrl, {
  logRequestBody: true,
  logResponseBody: true,
  stringifyResponseBody: false,
  logResponseHeaders: true,
});

fixture("Test Cafe logger tests").page(testCafePageUrl).requestHooks(logger);

test("Simple logger test", async (t) => {
  await t
    .expect(logger.contains((record) => record.response.statusCode === 200))
    .ok();
  await convertLoggerResponses(t, { requestLogger: logger, toJson: true });
  let responseBody = logger.requests[0].response.body;
  await t
    .expect(responseBody.owner["login"])
    .eql("DevExpress")
    .expect(responseBody.license["name"])
    .eql("MIT License")
    .expect(responseBody.subscribers_count > 100)
    .ok();
});
