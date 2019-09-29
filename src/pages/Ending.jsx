import * as React from "react";
import ending from "../images/ending.gif";

const Ending = props => {
  setTimeout(() => props.history.push("/home"), 7500);

  return (
    <div className="full-height">
      <img className="ending-gif" src={ending} />
    </div>
  );
};

export default Ending;
