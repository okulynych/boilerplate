# Boilerplate

Boilerplate is a simple test automation playground.

It's using [testcafe](https://devexpress.github.io/testcafe/) and [frisby](https://github.com/vlucas/frisby).


## Requrements

To run this project, you need a personal account on github.com.

You also need to generate personal api token.

## Installation

To run this project, install it locally using npm:

```
cd ../boilerplate
npm install
```

## Setting variables
To run tests, USER_NAME, USER_EMAIL, PASSWORD, AUTH_TOKEN env variables must be set.

These variables are your credentials to GitHub.

```
export USER_NAME='MyUser';
export USER_EMAIL='MyUser@dummy.com';
export PASSWORD='MyPass';
export AUTH_TOKEN='MyShinyMetalGitHubApiToken';
```

## Usage

```
npm run test-frontend
npm run test-backend
npm run test-all
```
