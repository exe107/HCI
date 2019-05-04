import * as React from "react";

export const Rectangle = props => (
  <svg className="shape">
    <rect width="100%" height="100%" {...props} />
  </svg>
);
