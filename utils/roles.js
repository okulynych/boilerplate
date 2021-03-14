import { Role } from "testcafe";
import { defaultUser } from "./users";
import { loginPageUrl } from "./constants";
import {
  userEmailInput,
  userPwdInput,
  submitBtn,
} from "../tests/frontend/pages/GitHubLoginPage";

export const defaultRole = Role(
  loginPageUrl,
  async (t) => {
    const { userEmail, password } = { ...defaultUser };
    await t
      .typeText(userEmailInput, userEmail, { replace: true })
      .typeText(userPwdInput, password, { replace: true })
      .click(submitBtn);
  },
  { preserveUrl: true }
);
