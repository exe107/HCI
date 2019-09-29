import * as React from "react";

export const Triangle = props => {
  const { offset, ...rest } = props;
  const offsetValue = offset || 0;

  return (
    <svg className="shape" viewBox="-3 -2 105 105">
      <polygon
        points={`${100 - offsetValue},100 50,0 ${offsetValue},100`}
        {...rest}
      />
    </svg>
  );
};
