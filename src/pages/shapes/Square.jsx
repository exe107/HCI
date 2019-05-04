import * as React from "react";

export const Square = props => (
  <svg className="shape" viewBox="0 0 100 100">
    <rect width="100" height="100" {...props} />
  </svg>
);
