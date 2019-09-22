import * as React from "react";
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
          <div className="full-height d-flex justify-content-center align-items-center flex-wrap">
            <div className="d-flex justify-content-between align-items-center shapes-row w-100">
              <div className="shape-container">
                <Rectangle />
                <div className="text-center responsive-text">Правоаголник</div>
              </div>
              <div className="shape-container">
                <Triangle offset={20} />
                <div className="text-center responsive-text">Триаголник</div>
              </div>
            </div>
            <div className="d-flex justify-content-between shapes-row w-100">
              <div className="shape-container">
                <Square />
                <div className="text-center responsive-text">Квадрат</div>
              </div>
              <div className="shape-container">
                <Circle />
                <div className="text-center responsive-text">Круг</div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-2" />
      </div>
    );
  }
}
