1. Track time spent on a webpage
2. Stop tracking after no activity for some time
3. Do not stop tracking if watching video



### Video capabilities

In order for proper tracking of media websites, we need to

1. Detect video playing;
2. Detect video stopping;

Some problems that occured:

- Video can be in an iframe, and that iframe can be removed, no stop event emitted;
- Video can be played in background, in this case the timer should be active;
- Video can be played on a non-active tab, but on a visible (second) window;
- Video can be added and removed from DOM dynamically.



---

This is a boilerplate repo for starting a modular development of browser extension.

Here you will find boilerplate for:
- Popup and options pages 
- Background and content scripts
- Manifest file for extension

All this with support for 
- React
- Webpack
- Coffeescript
- Less, css

The nice feature of this boilerplate that you can easily reuse code from any react project. 
It's fully ok if you use js, just add the js part to webpack.config.coffee.

# Usage

1. Install packages: `yarn` or `npm i`
2. Build the extension: `yarn build`
3. Install web-ext tool
4. Run it with running `web-ext run` from `build/` folder

## Auto-reload

or use autoreload: `yarn start`

App will update automatically on rebuild.


Browsers:
- Firefox >48
- Chrome
- babel-env included, so you can configure more

HMR is currently not set up
use web-ext from firefox to hot-reload on filechange


# Why coffeescript?

because it's less verbose. I personally love to use this style of syntax:

```coffeescript
import React, { Component } from 'react'
import L from 'react-dom-factories'
L_ = React.createElement

Greeting = ()->
  L.div className:'greeting',
	L.h2 style:textAlign:'center', 'Hello World'

export default class App extends React.Component
  constructor:->
    super()
     
  render: ->
    L.div className:'app',
      L_ Greeting, null

ReactDOM.render <App />, document.getElementById 'root'

```
