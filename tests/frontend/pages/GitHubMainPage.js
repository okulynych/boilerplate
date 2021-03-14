import { Selector, t } from "testcafe";
import { getCurrentPageUrl } from "../../../utils/helpers";
import { defaultUser } from "../../../utils/users";
import { mainPageUrl } from "../../../utils/constants";

export const userAvatar = Selector("img")
  .withAttribute("alt", `@${defaultUser.userName}`)
  .nth(1);
export const yourReposMenuItem = Selector("a").withAttribute(
  "href",
  `/${defaultUser.userName}?tab=repositories`
);

export async function navigateToAllReposPage() {
  await t
    .click(userAvatar)
    .expect(yourReposMenuItem.visible)
    .ok()
    .click(yourReposMenuItem)
    .expect(getCurrentPageUrl())
    .contains(`${mainPageUrl}/${defaultUser.userName}?tab=repositories`);
}
