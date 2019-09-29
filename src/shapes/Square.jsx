import * as React from "react";

export const Square = props => (
  <svg className="shape" viewBox="-2 -2 105 105">
    <rect width="100" height="100" {...props} />
  </svg>
);
