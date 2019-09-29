import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import styled from "styled-components";
import { range, shuffle } from "lodash";
import { CANVAS_ID, colorsMap, componentsMap, CONGRATULATIONS_AUDIO_ID } from "./constants";
import {
  generateConfetti,
  randomColor,
  randomCongratulationsAudio,
  resolveShapeAndColorAudio
} from "./helper";
import * as Actions from "../redux/completed/actions";

const SHAPE_COLOR_AUDIO_ID = "shape-color-audio";

const ShapeContainer = styled.div`
  width: 20%;
  height: calc(30% - 3%);
  margin-right: ${props => ((props.index + 1) % 4 === 0 ? 0 : "6%")};
  margin-bottom: 3%;
`;

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
      const isWantedShapeRectangle = wantedShape === "R";

      const correctShape = isWantedShapeRectangle
        ? shape === "R" || shape === "S"
        : shape === wantedShape;

      const correctColor = color === wantedColor;
      const correct = correctShape && correctColor;

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
    !this.isLevelFinished() &&
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

  isLevelFinished = () => {
    const {
      selectedShapesCount,
      correctSelectedShapesCount,
      correctShapesCount
    } = this.state;

    return (
      selectedShapesCount === correctSelectedShapesCount &&
      correctSelectedShapesCount === correctShapesCount
    );
  };

  playAudio = elementId => document.getElementById(elementId).play();

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.isLevelFinished()) {
      const {
        match: {
          params: { id }
        }
      } = this.props;

      const confetti = generateConfetti();
      confetti.render();

      setTimeout(() => {
        confetti.clear();
        const isLastStage = +id === 3;
        const redirectUrl = isLastStage ? "/play" : `/intro/${+id + 1}`;
        this.props.history.push(redirectUrl);
      }, 3000);

      this.playAudio(CONGRATULATIONS_AUDIO_ID);
    }
  }

  render() {
    const { shapes, wantedShape, wantedColor } = this.state;

    const wantedColorId = colorsMap[wantedColor];

    const shapeAndColorAudio = resolveShapeAndColorAudio(
      `${wantedColorId}${wantedShape}`
    );

    const congratulationsAudio = randomCongratulationsAudio();

    return (
      <div className="row">
        <canvas id={CANVAS_ID} className="canvas full-height"></canvas>
        <audio
          id={SHAPE_COLOR_AUDIO_ID}
          src={shapeAndColorAudio}
          autoPlay
        ></audio>
        <audio
          id={CONGRATULATIONS_AUDIO_ID}
          src={congratulationsAudio}
        ></audio>
        <div className="col-1"></div>
        <div className="col-10">
          <div className="full-height">
            <div className="text-center py-2">
              <button
                className="btn btn-secondary"
                onClick={() => this.playAudio(SHAPE_COLOR_AUDIO_ID)}
              >
                <i className="fa fa-volume-up" />
              </button>
            </div>
            <div className="intro-shapes">
              <div className="d-flex flex-wrap w-100 h-100">
                {shapes.map((item, index) => {
                  const ShapeComponent = componentsMap[item.shape];
                  const strokeProps = item.selected && {
                    stroke: "black",
                    strokeWidth: "3"
                  };

                  return (
                    <ShapeContainer key={item.index} index={index}>
                      <ShapeComponent
                        onClick={() => this.onShapeClick(item.index)}
                        fill={item.color}
                        {...strokeProps}
                      />
                    </ShapeContainer>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="col-1"></div>
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
