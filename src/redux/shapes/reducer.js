import { shuffle } from "lodash";
import { reducerWithActionMappings } from "../createReducer";
import { shapes } from "../../pages/constants";
import { RESET_STATE } from "../actions";

const shuffleShapes = (state, action) => shuffle(shapes);

export const shapesReducer = () =>
  reducerWithActionMappings(
    {
      [RESET_STATE]: shuffleShapes
    },
    shapes
  );
