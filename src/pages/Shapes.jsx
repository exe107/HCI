import * as React from "react";
import { componentsMap } from "./constants";
import { resolveShapeAudio } from "./helper";

const Shapes = props => {
  const SHAPES = React.useMemo(() => ["S", "R", "T", "C"], []);
  const [orderIndex, setOrderIndex] = React.useState(0);

  const currentShape = SHAPES[orderIndex];
  const ShapeComponent = componentsMap[currentShape];
  const shapeAudio = resolveShapeAudio(currentShape);

  const playAudio = React.useCallback(
    () => document.getElementById("audio-player").play(),
    []
  );

  React.useEffect(() => {
    playAudio();
  }, [playAudio, shapeAudio]);

  const onPreviousClick = React.useCallback(
    () => setOrderIndex(orderIndex - 1),
    [orderIndex]
  );

  const onNextClick = React.useCallback(
    () => {
      const isLastShape = orderIndex === SHAPES.length - 1;

      if (isLastShape) {
        props.history.push('/intro/0');
      } else {
        setOrderIndex(orderIndex + 1);
      }


    },
    [props, SHAPES, orderIndex]
  );

  const showPrevious = orderIndex > 0;

  return (
    <div className="row">
      <div className="col-2">
        {showPrevious && (
          <div className="d-flex justify-content-center align-items-center h-100">
            <i
              className="fa fa-2x fa-arrow-circle-left"
              onClick={onPreviousClick}
            />
          </div>
        )}
      </div>
      <div className="col-8">
        <div className="full-height">
          <audio id="audio-player" src={shapeAudio} autoPlay></audio>
          <div className="d-flex flex-column justify-content-center full-height">
            <div className="intro-shape mx-auto">
              <ShapeComponent />
            </div>
            <div className="text-center mt-5">
              <button className="btn btn-secondary" onClick={playAudio}>
                <i className="fa fa-volume-up" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="col-2">
        <div className="d-flex justify-content-center align-items-center h-100">
          <i className="fa fa-2x fa-arrow-circle-right" onClick={onNextClick} />
        </div>
      </div>
    </div>
  );
};

export default Shapes;
