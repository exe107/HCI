import * as React from "react";
import { Link } from "react-router-dom";
import { Triangle } from "./shapes/Triangle";
import { Square } from "./shapes/Square";
import { Rectangle } from "./shapes/Rectangle";
import { Circle } from "./shapes/Circle";

export default class Shapes extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="col-2" />
        <div className="col-8">
          {/*align vertically*/}
          <div className="full-height">
            <div className="d-flex justify-content-between shapes-row">
              <div className="shape-container">
                <Rectangle />
                <div className="text-center shape-name">Правоаголник</div>
              </div>
              <div className="shape-container">
                <Triangle />
                <div className="text-center shape-name">Триаголник</div>
              </div>
            </div>
            <div className="d-flex justify-content-between shapes-row">
              <div className="shape-container">
                <Square />
                <div className="text-center shape-name">Квадрат</div>
              </div>
              <div className="shape-container">
                <Circle />
                <div className="text-center shape-name">Круг</div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-2">
          <div className="d-flex justify-content-center align-items-center h-100">
            <Link className="unstyled-link" to="/intro/0">
              <div className="display-1">
                <span>&#62;</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
