## Getting Started - Client

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. 

### Prerequisites

* [NodeJS/NPM](https://nodejs.org) - Package Management
* [Gulp](http://gulpjs.com) - Build Tool
* [Bower](http://bower.io) - Dependency Management

### Installing

Open command prompt and switch current directory to uex/client

```
cd uex/client
```

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

Before running the client server, make sure your Grails server is running.

Switch environment to local

```
gulp switch-env --env local
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