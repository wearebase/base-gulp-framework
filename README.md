# Base Gulp Framework
This project moves common gulp build steps into a single package, allowing it to be shared across projects. Inspired by [this StackOverflow reply](https://stackoverflow.com/a/37317351).

## Getting started
To install:

    npm install wearebase/base-gulp-framework --save

or

    yarn add wearebase/base-gulp-framework

Then create a `gulpfile.js`:

    var gulp = require('base-gulp-framework')(require('gulp'), require('./base-config.json'));

And create a `base-config.json`. Modify the example (`example-config.json`) included in this repo. Top tip: You can also use arrays for src files if you wish.

Build commands are inside arrays, so you can add multiple 'groups' to allow the builds to run multiple times in different parts of your app.

## Adding your own tasks
Then you can add your own tasks below that if you need them. If you add a 'css' task when one already exists in this module, gulp will use your css task.

## Running local gulp
Add this to your `package.json`:

    "scripts": {
        "gulp": "gulp"
    }

If you're using yarn, it won't be automatically added to the `node_modules/.bin` folder as it's a sub-dependency, so also run `yarn add gulp`.

Now you can run `npm run gulp` (or `yarn run gulp`). To pass flags through, use `yarn run gulp -- --production`.

## Older npm versions
This framework is designed to work with npm v5 or yarn, where the dependencies form a flat structure.

If you have trouble calling gulp (see "Running local gulp"), then add gulp to your dependencies in your project.

    npm install gulp --save
or

    yarn add gulp
