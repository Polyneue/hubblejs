# Contributing

When contributing to this repository, please first discuss the change you wish to make via issue,
email, or any other method with the owners of this repository before making a change. 

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

HubbleJS uses [SemVer](http://semver.org/) for versioning. For available versions, see the [releases for this repository](https://github.com/Polyneue/hubblejs/releases).