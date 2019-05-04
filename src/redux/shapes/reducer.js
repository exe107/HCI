import { shuffle } from "lodash";
import { reducerWithActionMappings } from "../createReducer";
import { shapesMap } from "../../pages/constants";
import { RESET_STATE } from "../actions";

const shuffleShapes = (state, action) => shuffle(shapesMap);

export const shapesReducer = () =>
  reducerWithActionMappings(
    {
      [RESET_STATE]: shuffleShapes
    },
    shapesMap
  );
