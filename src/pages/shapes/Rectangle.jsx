import * as React from "react";

export const Rectangle = props => (
  <svg className="shape" viewBox="-2 -2 100 100">
    <rect width="75%" height="97%" {...props} />
  </svg>
);
