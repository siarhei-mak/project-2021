import React from "react";
import PropTypes from "prop-types";

import "./Rainbow.css";

class Rainbow extends React.Component {
  render() {
    var code = this.props.children;
    this.props.colors.forEach((color) => {
      code = (
        <div
          style={{
            borderStyle: "solid",
            borderWidth: "7px",
            borderColor: color,
          }}
        >
          {code}
        </div>
      );
    });
    return code;
  }
}

export default Rainbow;