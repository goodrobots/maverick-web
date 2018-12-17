# maverick-web

> Maverick Web Interface - Highly Experimental - DO NOT USE FOR REAL WORLD APPLICATIONS YET!

[![Build Status](http://newdev.maverick.one/jenkins/buildStatus/icon?job=maverick-web/Jenkins-ci)](http://dev.maverick.one/jenkins/blue/organizations/jenkins/maverick-web/branches/)

This is a very early experimental repo of a 'next generation' web interface for configuring and controlling UAVs.

maverick-web is a pure web application using modern Javascript technologies, and connects to multiple [maverick-api](https://github.com/goodrobots/maverick-api) backends for realtime data from multiple UAVs.

Or at least it will do, one day.

The experimental dev hot-reload server is available here: http://dev.maverick.one/maverick-web
The experimental static minified production site is available here: http://dev.maverick.one/web/maverick

## Dev Build Setup

``` bash
# install dependencies
npm -g install yarn
npm -g install @vue/cli
yarn install

# serve with hot reload at localhost:6794
yarn run serve

# build for production with minification
yarn run build

# build for production and view the bundle analyzer report
yarn run build --report
```
