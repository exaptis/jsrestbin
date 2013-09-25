#jsRestBin

##About
jsRestBin is a simple and easy to use request bin to record and debug api calls. It runs on node.js and requires a
mongoDB to persist data. The frontend is build up on backbone.js and require.js. Twitter Bootstrap is used as CSS
framework and LESS as css preprocessor.


##Setup

First make sure you have MongoDB, Node, Npm, Yeoman, Bower and Grunt installed.

Install mongoDB with:

    $ brew install mongodb

Or visit http://www.mongodb.org/

Visit nodejs.org to install node and NPM


Install phantomJS with:

    $ brew install phantomjs

Or visit http://phantomjs.org/


To install Yeoman, Bower and Grunt run:

    $ npm install -g yo grunt-cli bower


Install mocha-phantomjs:

    $ npm install -g mocha-phantomjs


Install mocha generator:

    $ npm install (-g) generator-mocha-amd


Install marionette generator

    $ npm install (-g) generator-marionett

##Credit
This project was inspired by Jeff Lindsay's RequestBin [http://requestb.in/](http://requestb.in/)

##Releases
	2013-09-25 David Loidolt
		* v0.2.0 Begin Marionette.js rewrite
    	* v0.1.0 initial release written in plain Backbone.js

##Roadmap
* 100% Testcoverage
* Exchange REST Interface `express.js` with `baucis.js`
* ...

##Contributors
David Loidolt david.loidolt@gmail.com

##License
This project is licensed under the MIT License, see the LICENSE.TXT file for more information.