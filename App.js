/**
 * Copyright (c) 2015-present, Viro Media, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */
"use strict";

import React, { Component } from "react";

import { AppRegistry } from "react-native";

import { ViroVRSceneNavigator, ViroARSceneNavigator } from "react-viro";

var createReactClass = require("create-react-class");

/*
 * TODO: Add your API key below!!
 */
var apiKey = "A20F6D59-E9E2-4A51-8A75-8159B78B6804";

var vrScenes = {
  "360PhotoTour": require("./js/360PhotoTour/MainScene"),
  HumanBody: require("./js/HumanBody/MainScene"),
  ProductShowcase: require("./js/ProductShowcase/ProductShowcase"),
  ViroMediaPlayer: require("./js/ViroMediaPlayer/ViroTheatre"),
  ParticleEmitters: require("./js/ParticleEmitters/ViroParticleTemplates"),
  PhysicsSample: require("./js/PhysicsSample/BasicPhysicsSample"),
  PhotoCopy: require("./js/PhotoCopy/MainScene")
};

var arScenes = {
  ARSimpleSample: require("./js/ARSample/HelloWorldSceneAR.js"),
  ARPhysicsSample: require("./js/ARPhysicsSample/BasicPhysicsSample.js"),
  ARCarDemo: require("./js/ARCarDemo/ARCarDemo.js"),
  ARPosterDemo: require("./js/ARPosterDemo/ARPosterDemo.js")
};

var showARScene = false;

var ViroCodeSamplesSceneNavigator = createReactClass({
  render: function() {
    if (showARScene) {
      return (
        <ViroARSceneNavigator
          initialScene={{
            scene: arScenes["ARSimpleSample"]
          }}
          apiKey={apiKey}
        />
      );
    } else {
      return (
        <ViroVRSceneNavigator
          initialScene={{
            scene: vrScenes["PhotoCopy"]
          }}
          apiKey={apiKey}
        />
      );
    }
  }
});

module.exports = ViroCodeSamplesSceneNavigator;
