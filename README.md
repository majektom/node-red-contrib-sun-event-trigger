[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) [![Build Status](https://travis-ci.org/majektom/node-red-contrib-sun-event-trigger.svg?branch=master)](https://travis-ci.org/majektom/node-red-contrib-sun-event-trigger)

# node-red-contrib-sun-event-trigger

A simple node-red node that, for a given sun event, calculates the time of next occurrence of the event at a given geographic location. The node injects a message into the flow at the calculated time.

The node calculates the sun event occurrence time by means of the [SunCalc](https://www.npmjs.com/package/suncalc) library.
