# Aztec Diamonds

This repository contains an Angular application that constructs possible domino tilings in [Aztec diamonds](https://mathworld.wolfram.com/AztecDiamond.html).

The construction logic and visualization is heavily inspired by the Mathologer video about the Arctic Circle theorem ([YouTube](https://youtu.be/Yy7Q8IWNfHM)).

## Building and running
To build and run the application, you need to have Node.js version 12 or later installed. Run `npm install` in the repository to install the required dependencies.

Optionally, install the Angular CLI globally by running `npm install --global @angular/cli`. This allows you to run the commands below. If you do not want this,
you need to prefix the commands below with `npx`.

## Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build
Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running tests
Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
