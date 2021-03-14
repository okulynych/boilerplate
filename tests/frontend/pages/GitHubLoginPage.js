import { Selector, t } from "testcafe";
import { defaultRole } from "../../../utils/roles";
import { getCurrentPageUrl } from "../../../utils/helpers";
import { mainPageUrl, loginPageUrl } from "../../../utils/constants";

export const signInBtn = Selector("a").withExactText("Sign in");
export const userEmailInput = Selector("#login_field");
export const userPwdInput = Selector("#password");
export const submitBtn = Selector("input[type=submit]");

export async function navigateToLoginPage() {
  await t.navigateTo(mainPageUrl);
  await t.click(signInBtn);
  await t.expect(getCurrentPageUrl()).contains(loginPageUrl);
}
export async function loginWithDefaultRole() {
  await t.useRole(defaultRole);
  await t.expect(getCurrentPageUrl()).contains(mainPageUrl);
}
