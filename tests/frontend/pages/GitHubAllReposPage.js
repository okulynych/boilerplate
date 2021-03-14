import { Selector, t } from "testcafe";
import { getCurrentPageUrl } from "../../../utils/helpers";
import { defaultUser } from "../../../utils/users";
import { userCustomData } from "../../data/userCustomData";

export const newBtn = Selector('a[href="/new"][class*=btn]');
export const repoNameInput = Selector("#repository_name");
export const repoTypePublic = Selector("#repository_visibility_public");
export const repoTypePrivate = Selector("#repository_visibility_private");
export const submitBtn = Selector("button").withExactText("Create repository");
export const successBaloon = Selector("dd").withText(
  `${userCustomData.repoName} is available.`
);
export const repoNameLink = Selector(
  `a[href="/${defaultUser.userName}/${userCustomData.repoName}"]`
);

export async function addNewRepo() {
  await t
    .expect(newBtn.visible)
    .ok()
    .click(newBtn)
    .expect(submitBtn.hasAttribute("disabled"))
    .ok()
    .typeText(repoNameInput, userCustomData.repoName)
    .expect(successBaloon.exists)
    .ok();

  await setRepoType(userCustomData.repoType);

  await t
    .expect(submitBtn.hasAttribute("disabled"))
    .notOk()
    .click(submitBtn)
    .expect(getCurrentPageUrl())
    .contains(userCustomData.repoName);
}

export async function setRepoType(repoType) {
  if (repoType === "private") {
    await t.click(repoTypePrivate);
  } else {
    await t.click(repoTypePublic);
  }
}

export async function openRepoDetails() {
  await t.expect(repoNameLink.visible).ok().click(repoNameLink);
}
