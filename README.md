[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) [![Build Status](https://travis-ci.org/majektom/node-red-contrib-sun-event-trigger.svg?branch=master)](https://travis-ci.org/majektom/node-red-contrib-sun-event-trigger)

# node-red-contrib-sun-event-trigger

A simple node-red node that, for a given sun event, calculates the time of next occurrence of the event at a given geographic location. The node injects a message into the flow at the calculated time.

The node calculates the sun event occurrence time by means of the [SunCalc](https://www.npmjs.com/package/suncalc) library.

## Description

This node calculates the time of next occurrence of a given sun event at a given geographical location and injects a message into the flow at the calculated time. The node allows to configure a time offset (either negative or positive) for the injection time. Additionally, the user can manually trigger message injection via the node-red admin panel, similarly as they can do for the standard node-red's inject node.

## Installation

You can install the node by the node-red's palette manager or by executing the following command in your node-red's home directory:
```bash
npm install node-red-contrib-sun-event-trigger
```

## Usage

Use the node in the same way as you would use the standard node-red's inject node. For example:

![inject example](https://github.com/majektom/node-red-contrib-sun-event-trigger/raw/master/doc/images/inject-example.png "Inject example flow")

## Configuration

See the node's help page in the node-red's admin panel for exhaustive information.

## Appreciation

If you want to say thank you by donation, you can do it here:
[![Donate](https://www.paypalobjects.com/en_US/PL/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/donate?hosted_button_id=7DQMX6KQZ8R42)
