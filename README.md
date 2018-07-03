# HubbleJS
[![Coverage Status](https://coveralls.io/repos/github/Polyneue/hubblejs/badge.svg?branch=master)](https://coveralls.io/github/Polyneue/hubblejs?branch=master)

HubbleJS is a customizable Node.js portfolio generator for developers that is powered by the Github API. 

## Features

* Quick and easy set up
* Static file output, to enable hosting from anywhere
* Personalize your Github data
* Standardized Github response, to easily create custom templates

## Default Site

HubbleJS comes bundled with a default theme that can be customized to reflect your personality. For more information on the default theme, checkout the repository [hubblejs-default-theme](https://github.com/Polyneue/hubblejs-default-theme).

![HubbleJS Default Theme - Dark](https://raw.githubusercontent.com/Polyneue/hubblejs-default-theme/master/examples/images/hubblejs-default-theme-dark-example-1.png)

## Getting Started

HubbleJS was created to allow for quick set up with minimal configuration. Following the steps below will have your site built within minutes.

* Generate a [Personal Access Token](https://github.com/settings/tokens)
    * HubbleJS requires access to both the Repo and User scopes
* Install HubbleJS into your project directory

```shell
npm install --save-dev hubble.js
```

* Require HubbleJS and provide the necessary configuration

```javascript
const Hubble = require('hubble.js');

// Configure the Hubble instance
const hubble = new Hubble({
  username: 'GH_USER_NAME',
  token: 'GH_PERSONAL_ACCESS_TOKEN'
});

// Generate the site
hubble.generate();
```

Following the above steps will configure HubbleJS, generate a site using the default theme, and output the HTML to `./dist/index.html`.

## Configuration

There are a number of configuration options when instantiating a new HubbleJS instance. Configuration properties are optional unless otherwise noted.

```javascript
const hubble = new Hubble({
  
  // REQUIRED: Your Github username
  username: 'GH_USERNAME',

  // REQUIRED: Github personal access token
  token: 'GH_ACCESS_TOKEN',

  // Names of the repositories to be displayed on the site, in this order. Default is All.
  repositories: ['MY_REPO_NAME'],

  // The location for the generated index.html file. Default is ./dist/index.html
  output: './dist/index.html',

  // The configuration for a theme.
  theme: {
    // ...See theme documentation for options.
  }
});

```

## API Reference

### `Hubble.generate(template)`
Will generate the static HTML file based on the Hubble configuration.

* `template` - `Function` (optional)

**Cases:**

* `template` is a `Function`: the method will pass all data into that function and expect it to return a promise or throw an error.
* `template` is `undefined`: The method will use the default theme to render the HTML.

## Tests

All tests use production responses from the Github API. This means that running the test suite will require the following environment variables to be set:

* `GH_USER_NAME` - Your Github user name
* `GH_ACCESS_TOKEN` - Your personal access token

With the above variables set, use the following command to run the test suite and generate a coverage report.

```shell
npm run cover
```

## Style guide

HubbleJS uses ESLint to validate code style, before submitting a pull request please lint files using the following command:

```shell
npm run lint
```

## Versioning

HubbleJS uses [SemVer](http://semver.org/) for versioning. For available versions, see the [tags for this repository](/tags).

## Licensing

Code copyright 2018 Ed Mendoza. Code released under the [MIT license](./LICENSE)