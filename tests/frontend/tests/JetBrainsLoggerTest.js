import { jetBrainsUrl, jetBrainsApiUrl } from "../../../utils/constants";
import { convertLoggerResponses } from "../../../utils/helpers";
import { RequestLogger } from "testcafe";

const logger = RequestLogger(jetBrainsApiUrl, {
  logRequestBody: true,
  logResponseBody: true,
  stringifyResponseBody: false,
  logResponseHeaders: true,
});

fixture("Jet Brains logger tests").page(jetBrainsUrl).requestHooks(logger);

test("Simple logger test", async (t) => {
  await t
    .expect(logger.contains((record) => record.response.statusCode === 200))
    .ok();
  await convertLoggerResponses(t, { requestLogger: logger, toJson: true });
  await t.expect(logger.requests[0].response.body.name).eql("Poland");
});
