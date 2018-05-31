# Items Catalog App

[![Build Status](https://travis-ci.org/wederribas/items-catalog.svg?branch=master)](https://travis-ci.org/wederribas/items-catalog)
[![GitHub issues](https://img.shields.io/github/issues/wederribas/items-catalog.svg)](https://github.com/wederribas/items-catalog/issues)
![Contributions welcome](https://img.shields.io/badge/contributions-welcome-orange.svg)
[![GitHub stars](https://img.shields.io/github/stars/wederribas/items-catalog.svg)](https://github.com/wederribas/items-catalog/stargazers)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/wederribas/items-catalog/master/LICENSE)

This project is part of the [Udacity Full Stack Web Developer nanodegree](https://udacity.com/course/full-stack-web-developer-nanodegree--nd004).

The _Items Catalog App_ is the place where you can store items information (such as products description, books reviews etc.), organized by categories. The app relies in the Google Authentication API, making it easy for users to sign-in into the app.

This project was build on top of three different Docker images, in order to enable a "Microservices-like" architecture. The first image hosts the Web Application, built with React. The seconde image hosts the Python API. And finally, the third image hosts the PostgreSQL database. The images are interconnected by Docker Compose.

## Built With

* [ReactJS](https://reactjs.org/)
* [React Router](https://reacttraining.com/react-router/)
* [Webpack](https://webpack.js.org/)
* [Babel](https://babeljs.io/)
* [Firebase](https://firebase.google.com)
* [Python 3](https://www.python.org/)
* [Flask](http://flask.pocoo.org/)
* [SQL Alchemy](https://www.sqlalchemy.org/)
* [Docker](https://www.docker.com/)
* [Google Authentication](https://developers.google.com/identity/)

## Requirements

* _Development:_ to build the development environment, you will need to have Docker installed in your computer, as the Python API and the database configuration are pre-configured in the docker compose files. Regarding the front-end application, you'll have the option to use the Docker image, or runs it directly from your computer by installing the Node modules on it. I'd recommend the first option, as the image is already configured to have a development version with Hot-Reloading and debug enabled.
  In case you want to build the React application in your computer, check the [Installation](#installation) section.

* _Production:_ in order to run the project in production environments you will only need to have a Docker ready environment (your own computer or a cloud based server). Once you have installed Docker, follow the instructions in the [Installation](#installation) section.

## Installation

First of all, clone this repo:
`$ git clone https://github.com/wederribas/items-catalog.git`

### Development environment

As described in the _Requirements_ section, you could rely only in the Docker images to build the development environment, with no need to install anything in your computer but Docker. To get the development environment up and running, follow the steps below:

```
# Get into the project folder and navigate to the docker folder
$ cd /items-catalog/docker

# Option 1 - Execute the docker-compose command directly into the terminal
$ docker-compose up -d --build;

# Option 2 - Execute the compose-up.sh file - same command encapsulated ;-)
$ ./compose-up.sh
```

**ATTENTION:** The application build could take a while to be ready after running the compose command. It may take some minutes to the Web App or the API to be accessible. Keep reloading until ready ;-).

If you want to build the React app into your own computer (for testing, or to debug something in Webpack) you will need to remove the webapp from the docker-compose build, and follow the steps below to get the web app running locally:

```
# Get into the project folder and navigate to the React app
cd /items-catalog/catalog_app

# Install the package dependencies locally
$ npm install

# Start the development server
$ npm run start
```

### Production environment

To build de production environment, it is needed to set some environment variables first. Those variables will guarantee that the React app will be optmized to production, and will disable the debug from the Python API.

Follow the steps below to create the production environment:

```
# Get into the project folder and navigate to the docker folder
$ cd /items-catalog/docker

# Execute the docker-compose command with the env variables set
$ NODE_ENV="production" API_ENV="production" docker-compose up -d --build;
```

### Post environment build

After the building phase, the containers must be running and you'll be able to access both web app and API endpoint in your browser.

* Web App: http://127.0.0.1:8080 (or your defined DNS)
* API: http://127.0.0.1:8000 (or your defined DNS)

Hint: use the command `docker ps` to check if the containers are running.

**ATTENTION:** The application build could take a while to be ready. It may take some minutes to the Web App or the API to be accessible. Keep reloading until ready ;-).

## Authors

* **Weder Ribas** - [@wederribas](https://twitter.com/wederribas)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for detail
