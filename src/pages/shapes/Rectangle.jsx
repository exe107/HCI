import * as React from "react";

export const Rectangle = props => (
  <svg className="shape d-flex mx-auto" viewBox="0 -1.5 100 100">
    <rect x="17%" width="65%" height="97%" {...props} />
  </svg>
);
