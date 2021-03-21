import { navigateToLoginPage } from "../pages/GitHubLoginPage";
import { loginWithDefaultRole } from "../pages/GitHubLoginPage";

fixture("Login to GitHub");

test("Github login with default user", async (t) => {
  await navigateToLoginPage();
  await loginWithDefaultRole();
});
