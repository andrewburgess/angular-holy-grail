# Angular Holy Grail

This is an opinionated holy grail set up for an Angular 1.X application, which
leverages a number of awesome utilities to make development a breeze.

# Running the Application

After cloning the application, run the following to fetch all of your
dependencies:

```
npm install
bower install
```

Once your dependencies have been fetched, you can run the development server by
executing

```
grunt serve
```

When you want to deploy the application, you can execute

```
grunt build
```

to produce a production build of the application, which will be placed in the
`dist` folder.

**NOTE:** you will need to also run `npm install --production` inside the `dist`
folder to install the production dependencies (you don't need to run `bower`
since the dependencies for the front end have already been bundled).

# Structure

There is a heavy amount of focus on keeping things modular in this setup. Each
of the top level folders will be explained, and then the actual architecture
will be outlined.

## `client`

Here is where all of the client side code lives. This is where your Bower
components live, as well as static assets, templates, Javascript, Stylus, etc.

Each "component" of your site should be put into its own folder, similar to the
`home` directory. A full page should have a template, a controller, and a
`states.js` file.

### `client/assets`

The `assets` folder contains any static files that are needed for your
application. Place any images, icons, fonts, etc here. Anything in this folder
will be delivered as a static asset.

### `client/global`

*Note: this folder may be refactored away*

Currently, the `global` folder houses global styles that apply to the entire
application, as well as any Stylus variables/mixins/functions/etc. This folder
also contains the `HeadController` which manages the `<head>` section of the
page.

### `client/lib`

Utilities, libraries, and other source files live here.

### `client/vendor`

Anything that needs to be included on the page from a 3rd party, that you can't
find on [bower.io](http://bower.io) should be placed here. Include any CSS files
as well here provided by 3rd parties.

## `config`

Application configuration items are placed in this folder. The naming convention
for your configuration files should be `config.<NODE_ENV>.js`. The application
will load `config.base.js` first, and then apply `config.<NODE_ENV>.js` over it,
replacing any properties that are defined in the environment specific file.

## `grunt`

Each [Grunt](http://gruntjs.com) task is separated out into its own file, and
configured there. They are automatically loaded in by the `index.js` file in
there.

## `server`

The application server is defined here.

## `test`

All tests should be defined here

# What Kind Of Magic Can I Expect?

Since there's so much magic, this will be difficult to organize. Sorry about
that.

Templates are built using [Jade](http://jade-lang.com)

Styles are built using [Stylus](https://learnboost.github.io/stylus/)

Adding new client side JS files are automatically imported in `index.jade`
(using `grunt fileblocks`)

Adding new Stylus files are automatically imported in `index.styl` (using
`grunt fileblocks`)

Production builds are made with `ng-annotate`, which means you can use the
Angular shorthand
(`angular.controller('ctrl', function ($scope, otherDependencies) { })`)
without worrying about minification.

Templates are compiled and included in the built `app.js` file to minimize the
number of HTTP requests the client has to make to produce a view (and can be
modified if certain templates don't need to be included client side).
