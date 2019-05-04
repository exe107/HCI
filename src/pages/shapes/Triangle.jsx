import * as React from "react";

export const Triangle = props => (
  <svg className="shape" preserveAspectRatio="none" viewBox="0 0 100 100">
    <polygon points="50,0 100,100 0,100" {...props} />
  </svg>
);
