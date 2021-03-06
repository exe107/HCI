import { times, constant } from "lodash";
import { reducerWithActionMappings } from "../createReducer";
import { RESET_STATE } from "../actions";
import { SET_COMPLETED } from "./actions";
import { shapes } from "../../pages/constants";

const initializeCompleted = () => times(shapes.length, constant(false));

const setCompleted = (state, action) =>
  state.map((item, id) => (action.id === id ? true : item));

export const completedReducer = () =>
  reducerWithActionMappings(
    {
      [RESET_STATE]: initializeCompleted,
      [SET_COMPLETED]: setCompleted
    },
    initializeCompleted()
  );
