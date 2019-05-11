import * as React from "react";

export const Circle = props => (
  <svg className="shape" viewBox="0 0 105 105">
    <circle cx="50%" cy="50%" r="50" {...props} />
  </svg>
);
