import * as React from "react";

export const Circle = props => (
  <svg className="shape" viewBox="0 0 100 100">
    <circle cx="50%" cy="50%" r="50" {...props} />
  </svg>
);
