"use strict";

import React from "react";
import ReactDOM from "react-dom";

import Rainbow from "./components/Rainbow";

var colors = ["red", "orange", "yellow", "green", "#00BFFF", "blue", "purple"];

ReactDOM.render(
  <Rainbow colors={colors} >
    Hello!
  </Rainbow>,
  document.getElementById("container")
);