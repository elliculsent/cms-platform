## Getting Started 

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. 

## Prerequisites

* [NodeJS/NPM](https://nodejs.org) - Package Management
* [Gulp](http://gulpjs.com) - Build Tool
* [Bower](http://bower.io) - Dependency Management

## Installing
Execute the following to install gulp NPM module globally. Gulp is a build/task runner to help automate client-side build tasks.

```
npm install -g gulp
```

Execute the following to install bower NPM module globally. Bower is a package manager that helps in fetching and installing packages and libraries for client-side application.

```
npm install -g bower
```

Execute the following to install all node module dependencies for the project.

```
npm install
```

Execute the following to download all bower dependencies for the project

```
bower install
```

Execute the following to run the web server locally and watch for file changes. 

```
gulp serve
```

## Running the tests

Execute the following to run unit tests

```
gulp karma
```