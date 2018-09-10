/**
 * Copyright (c) 2015-present, Viro Media, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

"use strict";

/**
 * Pull in all imports required for the controls within this scene.
 */
import React, { Component } from "react";
import { StyleSheet } from "react-native";

import {
  ViroScene,
  Viro360Image,
  ViroImage,
  ViroAnimations,
  ViroNode,
  ViroText,
  ViroUtils
} from "react-viro";

let polarToCartesian = ViroUtils.polarToCartesian;

/**
 * Set all the images and assets required in this scene.
 */
var westLakeTowersScene = require("./WestLakeTowers");
var treeScene = require("./Trees");
var backgroundImage = require("./res/westlake_towers.jpg");
var weworkImage = require("./res/wework_title.png");
var infoIcon = require("./res/tree.jpg");

export default class MainScene extends Component {
  constructor() {
    super();

    // set initial state
    this.state = {
      runShowTitleAnimation: false
    };

    // bind `this` to functions
    this._onBackgroundPhotoLoadEnd = this._onBackgroundPhotoLoadEnd.bind(this);
    this._onTitleClicked = this._onTitleClicked.bind(this);
    this._onTreeClicked = this._onTreeClicked.bind(this);
  }

  /**
   * Renders a scene with a 360 Photo background that contains a single WeWork ViroImage. This
   * image will be faded/scaled in with the "showTitleAnimation" when the scene first appears. Clicking on
   * the WeWork ViroImage will launch the user into the next scene (WestLakeTowers).
   */
  render() {
    return (
      <ViroScene style={styles.container}>
        <Viro360Image
          source={backgroundImage}
          onLoadEnd={this._onBackgroundPhotoLoadEnd}
        />

        <ViroImage
          position={[0, 0, -5]}
          source={weworkImage}
          scale={[0.1, 0.1, 0.1]}
          opacity={0.0}
          onClick={this._onTitleClicked}
          animation={{
            name: "showTitleAnimation",
            run: this.state.runShowTitleAnimation,
            loop: false
          }}
        />
        <ViroImage
          position={polarToCartesian([-2, 70, 0])}
          rotation={[0, -70, 0]}
          source={infoIcon}
          onClick={this._onTreeClicked}
        />
      </ViroScene>
    );
  }

  /**
   * Callback function for when image has finished loading in the Viro360Photo.
   * We then animate the WeWork ViroImage into the scene through the
   * setting of state runShowTitleAnimation.
   */
  _onBackgroundPhotoLoadEnd() {
    this.setState({
      runShowTitleAnimation: true
    });
  }

  /**
   * Callback function for when the user taps on the WeWork ViroImage
   * where we navigate into the second scene.
   */
  _onTitleClicked() {
    this.props.sceneNavigator.push({ scene: westLakeTowersScene });
  }

  _onTreeClicked() {
    this.props.sceneNavigator.push({ scene: treeScene });
  }
}

/**
 * Declare all custom flex box styles here to be reference by the
 * controls above.
 */
var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  helloWorldTextStyle: {
    fontFamily: "Arial",
    fontSize: 60,
    color: "#ffffff",
    textAlignVertical: "center",
    textAlign: "center"
  }
});

/**
 * Declare all your animations here. They'll be referenced by the animation props.
 */
ViroAnimations.registerAnimations({
  showTitleAnimation: {
    properties: { scaleX: 2, scaleY: 2, scaleZ: 2, opacity: 1.0 },
    easing: "PowerDecel",
    duration: 1000
  }
});

module.exports = MainScene;
