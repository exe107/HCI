import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";
import { range, shuffle } from "lodash";
import {
  colorsPluralForms,
  componentsMap,
  shapesPluralForms
} from "./constants";
import { randomColor } from "./helper";
import * as Actions from "../redux/completed/actions";

class Intro extends React.Component {
  state = {};

  static initState = props => {
    const {
      match: {
        params: { id }
      },
      shapes,
      colors
    } = props;

    const randomShapes = [];

    const wantedShape = shapes[id];
    const wantedColor = colors[+id % 3];

    randomShapes.push({
      index: 0,
      shape: wantedShape,
      color: wantedColor,
      correct: true,
      selected: false
    });

    range(1, 12).forEach(index => {
      const shape = shapes[index % 4];
      const color = randomColor();
      const correct = shape === wantedShape && color === wantedColor;

      randomShapes.push({
        index,
        shape,
        color,
        correct,
        selected: false
      });
    });

    return {
      id,
      wantedShape,
      wantedColor,
      correctShapesCount: randomShapes.reduce(
        (prev, curr) => prev + (curr.correct ? 1 : 0),
        0
      ),
      correctSelectedShapesCount: 0,
      selectedShapesCount: 0,
      shapes: shuffle(randomShapes)
    };
  };

  static getDerivedStateFromProps(props, prevState) {
    return props.match.params.id !== prevState.id
      ? Intro.initState(props)
      : null;
  }

  onShapeClick = index =>
    this.setState(prevState => {
      let {
        selectedShapesCount,
        correctSelectedShapesCount,
        shapes
      } = prevState;
      const selectedShape = shapes.find(shape => index === shape.index);
      const { selected, correct } = selectedShape;

      selectedShapesCount += selected ? -1 : 1;

      if (correct) {
        correctSelectedShapesCount += selected ? -1 : 1;
      }

      return {
        shapes: shapes.map(shape =>
          index === shape.index
            ? { ...shape, selected: !shape.selected }
            : shape
        ),
        selectedShapesCount,
        correctSelectedShapesCount
      };
    });

  render() {
    const {
      completed,
      match: {
        params: { id }
      },
      setCompleted
    } = this.props;
    const {
      shapes,
      selectedShapesCount,
      correctSelectedShapesCount,
      correctShapesCount,
      wantedShape,
      wantedColor
    } = this.state;

    const showNext =
      completed ||
      (selectedShapesCount === correctSelectedShapesCount &&
        correctSelectedShapesCount === correctShapesCount);

    return (
      <div className="row">
        <div className="col-2">
          <div className="d-flex justify-content-center align-items-center h-100">
            <Link
              className="unstyled-link"
              to={id > 0 ? `/intro/${+id - 1}` : "/shapes"}
            >
              <div className="display-1">
                <span>&#60;</span>
              </div>
            </Link>
          </div>
        </div>
        <div className="col-8">
          <div className="display-4 text-center pt-5 pb-5">
            Кликни на сите
            {` ${colorsPluralForms[wantedColor]} ${
              shapesPluralForms[wantedShape]
            }`}
          </div>
          <div className="d-flex justify-content-center align-items-center full-height">
            <div className="d-flex justify-content-between flex-wrap">
              {shapes.map(item => {
                const ShapeComponent = componentsMap[item.shape];
                const strokeProps = item.selected
                  ? { stroke: "black", strokeWidth: "3" }
                  : {};

                return (
                  <div key={item.index} className="intro-shape">
                    <ShapeComponent
                      onClick={() => this.onShapeClick(item.index)}
                      fill={item.color}
                      {...strokeProps}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="col-2">
          {showNext && (
            <div className="d-flex justify-content-center align-items-center h-100">
              <Link
                className="unstyled-link"
                to={`/intro/${+id + 1}`}
                onClick={() => setCompleted(+id)}
              >
                <div className="display-1">
                  <span>&#62;</span>
                </div>
              </Link>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToPropsFactory = (state, ownProps) => ({
  shapes: state.shapes,
  colors: state.colors,
  completed: state.completed[+ownProps.match.params.id]
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setCompleted: Actions.setCompleted
    },
    dispatch
  );

export default connect(
  mapStateToPropsFactory,
  mapDispatchToProps
)(Intro);
