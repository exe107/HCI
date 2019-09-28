import { shuffle } from "lodash";
import { colors } from "../../pages/constants";
import { reducerWithActionMappings } from "../createReducer";
import { RESET_STATE } from "../actions";

const shuffleColors = (state, action) => shuffle(colors);

export const colorsReducer = () =>
  reducerWithActionMappings(
    {
      [RESET_STATE]: shuffleColors
    },
    colors
  );
