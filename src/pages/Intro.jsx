import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import $ from "jquery";
import { range, shuffle } from "lodash";
import { colorsMap, componentsMap } from "./constants";
import { randomColor, resolveShapeAndColorAudio } from "./helper";
import * as Actions from "../redux/completed/actions";

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

  completeStage = event => {
    const { setCompleted } = this.props;
    const { id } = this.props.match.params;

    setCompleted(+id);

    if (+id === 3) {
      $("#modal").modal("show");
      event.preventDefault();
    }
  };

  onPlayClick = () => {
    $("#modal").modal("hide");
    this.props.history.push("/play");
  };

  playAudio = () => document.getElementById("audio-player").play();

  componentDidMount() {
    this.playAudio();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.wantedShape !== this.state.wantedShape) {
      this.playAudio();
    }
  }

  render() {
    const {
      completed,
      match: {
        params: { id }
      }
    } = this.props;
    const {
      shapes,
      selectedShapesCount,
      correctSelectedShapesCount,
      correctShapesCount,
      wantedShape,
      wantedColor
    } = this.state;

    const wantedColorId = colorsMap[wantedColor];

    const audioSrc = resolveShapeAndColorAudio(
      `${wantedColorId}${wantedShape}`
    );

    const playAudio = () => document.getElementById("audio-player").play();

    const showNext =
      completed ||
      (selectedShapesCount === correctSelectedShapesCount &&
        correctSelectedShapesCount === correctShapesCount);

    return (
      <div className="row no-gutters">
        <div className="col-1"></div>
        <div className="col-10">
          <div className="full-height">
            <audio id="audio-player" src={audioSrc} autoPlay></audio>
            <div className="text-center py-2">
              <button className="btn btn-secondary" onClick={playAudio}>
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
            {showNext && (
              <div className="text-center">
                <Link
                  className="unstyled-link"
                  to={`/intro/${+id + 1}`}
                  onClick={this.completeStage}
                >
                  <button className="btn btn-secondary">
                    <i className="fa fa-arrow-right" />
                  </button>
                </Link>
              </div>
            )}
          </div>
          <div className="modal fade" id="modal" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header align-items-center justify-content-center responsive-modal-text">
                  <div className="modal-title">Браво!</div>
                  <button type="button" className="close" data-dismiss="modal">
                    <div className="responsive-modal-text">&times;</div>
                  </button>
                </div>
                <div className="modal-body text-center responsive-modal-text">
                  <div>Спремен си да играш</div>
                  <button
                    className="btn btn-secondary btn-lg"
                    onClick={this.onPlayClick}
                  >
                    <i className="fa fa-play" />
                  </button>
                </div>
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
