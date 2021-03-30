import { Selector, t } from "testcafe";
import { getCurrentPageUrl } from "../../../utils/helpers";
import { userCustomData } from "../../data/userCustomData";

export const GitHubRepoDetailsRoot = Selector("#repo-content-pjax-container");
export const creatingNewFileLink = GitHubRepoDetailsRoot.find(
  "a"
).withExactText("creating a new file");
export const fileNameInput = GitHubRepoDetailsRoot.find("input[name=filename]");
export const fileContentInput = GitHubRepoDetailsRoot.find(
  "div[role=presentation][contenteditable=true]"
);
export const commitSummaryInput = GitHubRepoDetailsRoot.find(
  "#commit-summary-input"
);
export const submitFileBtn = GitHubRepoDetailsRoot.find("#submit-file");
export const swithBranchDropDown = Selector("#branch-select-menu");
export const createNewBranchInput = Selector("#context-commitish-filter-field");
export const createBranchLink = Selector("span").withText("Create branch: ");
export const branchesLink = Selector("span").withExactText("branches");
export const branchLinkByName = Selector(
  `a[class*=branch][href*="${userCustomData.branchName}"]`
).nth(0);
export const addFileBtn = Selector("span").withText("Add file");
export const createFileMenuItem = Selector("button").withText(
  "Create new file"
);
export const createdFileLink = Selector(
  `a[title="${userCustomData.fileName}"]`
);
export const createdFileCommitMessage = Selector(
  `a[title="${userCustomData.commitMessage}"]`
);
export const editThisFileBtn = Selector('button[aria-label="Edit this file"]');
export const newPullRequestBtn = Selector("a")
  .withText("New pull request")
  .nth(0);
export const pullRequestTitle = Selector("#pull_request_title");
export const pullRequestBodyInput = Selector("#pull_request_body");
export const createPullRequestBtn = Selector("button[type=submit]").withText(
  "Create pull request"
);
export const pullRequestsTabItem = Selector("span").withText("Pull requests");
export const pullRequestNameLink = Selector("a[id*=issue]");
export const mergePullRequestBtn = Selector("button").withText(
  "Merge pull request"
);
export const confirmMergeBtn = Selector("button").withText("Confirm merge");
export function pullRequestStatus(status) {
  return Selector("span[title*=Status]").withText(status);
}

export async function fillFileAndCommit(
  fileName,
  fileContent,
  commitMessage,
  fileExists = false
) {
  !fileExists && (await t.typeText(fileNameInput, fileName));
  await t
    .click(fileContentInput)
    .pressKey("ctrl+a delete")
    .typeText(fileContentInput, fileContent)
    .typeText(commitSummaryInput, commitMessage)
    .click(submitFileBtn);
}

export async function commitReadMeFile() {
  await t
    .click(creatingNewFileLink)
    .expect(submitFileBtn.hasAttribute("disabled"))
    .ok();
  await fillFileAndCommit(
    userCustomData.readMeFile,
    userCustomData.readMEContent,
    userCustomData.readMeCommitMessage
  );
}

export async function addBranch() {
  await t
    .expect(swithBranchDropDown.visible)
    .ok()
    .click(swithBranchDropDown)
    .expect(createNewBranchInput.visible)
    .ok()
    .typeText(createNewBranchInput, userCustomData.branchName)
    .click(createBranchLink)
    .expect(getCurrentPageUrl())
    .contains(`/tree/${userCustomData.branchName}`);
}

export async function addFile() {
  await t
    .click(branchesLink)
    .click(branchLinkByName)
    .expect(getCurrentPageUrl())
    .contains(`/tree/${userCustomData.branchName}`)
    .click(addFileBtn)
    .expect(createFileMenuItem.visible)
    .ok()
    .click(createFileMenuItem);
  await fillFileAndCommit(
    userCustomData.fileName,
    userCustomData.fileContent,
    userCustomData.commitMessage
  );
  await t
    .expect(createdFileLink.visible)
    .ok()
    .expect(createdFileCommitMessage.visible)
    .ok();
}

export async function updateFile() {
  await t
    .click(branchesLink)
    .click(branchLinkByName)
    .expect(getCurrentPageUrl())
    .contains(`/tree/${userCustomData.branchName}`)
    .expect(createdFileLink.visible)
    .ok()
    .expect(createdFileCommitMessage.visible)
    .ok();
  await t.click(createdFileLink).click(editThisFileBtn);
  await fillFileAndCommit(
    userCustomData.fileName,
    userCustomData.fileContentUpdate,
    userCustomData.commitMessageUpdate,
    true
  );
}

export async function createPullRequest() {
  await t
    .click(branchesLink)
    .expect(newPullRequestBtn.visible)
    .ok()
    .click(newPullRequestBtn);
  await t
    .click(pullRequestTitle)
    .pressKey("ctrl+a delete")
    .typeText(pullRequestTitle, userCustomData.pullRequestTitle)
    .typeText(pullRequestBodyInput, userCustomData.pullRequestText)
    .click(createPullRequestBtn)
    .expect(getCurrentPageUrl())
    .contains("/pull/")
    .expect(pullRequestStatus("Open").exists)
    .ok();
}

export async function mergePullRequest() {
  await t
    .click(pullRequestsTabItem)
    .expect(pullRequestNameLink.visible)
    .ok()
    .click(pullRequestNameLink)
    .click(mergePullRequestBtn)
    .click(confirmMergeBtn);
  await t.eval(() => location.reload(true));
  await t.expect(pullRequestStatus("Merged")).ok();
}
