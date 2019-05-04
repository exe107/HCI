import { shuffle } from "lodash";
import { colorsMap } from "../../pages/constants";
import { reducerWithActionMappings } from "../createReducer";
import { RESET_STATE } from "../actions";

const shuffleColors = (state, action) => shuffle(colorsMap);

export const colorsReducer = () =>
  reducerWithActionMappings(
    {
      [RESET_STATE]: shuffleColors
    },
    colorsMap
  );
