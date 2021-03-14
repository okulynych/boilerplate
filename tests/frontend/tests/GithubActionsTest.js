import {
  navigateToLoginPage,
  loginWithDefaultRole,
} from "../pages/GitHubLoginPage";
import { navigateToAllReposPage } from "../pages/GitHubMainPage";
import { addNewRepo, openRepoDetails } from "../pages/GitHubAllReposPage";
import {
  commitReadMeFile,
  addBranch,
  addFile,
  updateFile,
  createPullRequest,
  mergePullRequest,
} from "../pages/GitHubRepoDetailsPage";
import { deleteRepo } from "../../../utils/helpers";

fixture("Github actions test suite").after(async (ctx) => {
  deleteRepo();
});

test("User should create new repo", async (t) => {
  await navigateToLoginPage();
  await loginWithDefaultRole();
  await navigateToAllReposPage();
  await addNewRepo();
});

test("User should commit README file", async (t) => {
  await navigateToLoginPage();
  await loginWithDefaultRole();
  await navigateToAllReposPage();
  await openRepoDetails();
  await commitReadMeFile();
});

test("User should add new branch to repo", async (t) => {
  await navigateToLoginPage();
  await loginWithDefaultRole();
  await navigateToAllReposPage();
  await openRepoDetails();
  await addBranch();
});

test("User should commit file to branch", async (t) => {
  await navigateToLoginPage();
  await loginWithDefaultRole();
  await navigateToAllReposPage();
  await openRepoDetails();
  await addFile();
});

test("User should update existent file", async (t) => {
  await navigateToLoginPage();
  await loginWithDefaultRole();
  await navigateToAllReposPage();
  await openRepoDetails();
  await updateFile();
});

test("User should raise pull request", async (t) => {
  await navigateToLoginPage();
  await loginWithDefaultRole();
  await navigateToAllReposPage();
  await openRepoDetails();
  await createPullRequest();
});

test("User should merge pull request", async (t) => {
  await navigateToLoginPage();
  await loginWithDefaultRole();
  await navigateToAllReposPage();
  await openRepoDetails();
  await mergePullRequest();
});
