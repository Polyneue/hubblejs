# HubbleJS

[![npm version](https://badge.fury.io/js/hubble.js.svg)](https://badge.fury.io/js/hubble.js)
[![Coverage Status](https://coveralls.io/repos/github/Polyneue/hubblejs/badge.svg?branch=master)](https://coveralls.io/github/Polyneue/hubblejs?branch=master)
[![Build Status](https://travis-ci.org/Polyneue/hubblejs.png?branch=master)](https://travis-ci.org/Polyneue/hubblejs)

HubbleJS is a simple, customizable, Github static portfolio generator. HubbleJS is designed to quickly generate a static website with minimal configuration from the user. However, HubbleJS can be configured to use custom templates and has extensive options for generating a site unique for each portfolio.

## Features

* Quick and easy set up
* Static file output, to enable hosting from anywhere
* Personalize your Github data
* Standardized Github response, to easily create custom templates
* Compatible with any template engine

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

Will generate the site based on the configuration using the given template.

* `template {Function}` (optional) - method that will receive data, render the data, write it to the output location, and return or throw an error.

`template` receives two parameters:

> * `data {Object}` - Configuration and Github data
> * `output {String}` - Location to write the index.html file to

**Example:**

```javascript
Hubble.generate(function (data, output) {
  const render = `<p>${data.user.name}'s custom template.</p>`;
  fs.writeFileSync(output, render, 'utf8');
});
```

# Themes

HubbleJS comes with a built in dark and light theme that can be used right out of the box. It can also be used with any templating language to generate pages using Github API data.

## Default Theme

The default theme can be customized to reflect your personality. For customization options for the default theme, check out the repository [hubblejs-default-theme](https://github.com/Polyneue/hubblejs-default-theme#configuration).

![HubbleJS Default Theme - Dark](https://raw.githubusercontent.com/Polyneue/hubblejs-default-theme/master/examples/images/hubblejs-default-theme-dark-example-1.png)

## Custom Templates

Creating a custom theme for HubbleJS is simple, below is a basic example of using a templating language to generate a unique theme.

The following file will be a basic pug template that will be hydrated with data.

```html
p #{user.username}'s source code
```

Then we will use the Pug package to render the template.

```javascript
const Hubble = require('hubble.js');
const pug = require('pug');
const fs = require('fs');

hubble.generate(function (data, output) {
  const render = pug.compileFile('./pug/temp.pug');
  fs.writeFileSync(output, render, 'utf8')
});
```

## License

Copyright (c) 2018 Ed Mendoza.   
Code released under the [MIT license](https://github.com/Polyneue/hubblejs/blob/master/LICENSE).