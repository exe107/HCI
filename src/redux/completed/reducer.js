import { times, constant } from "lodash";
import { reducerWithActionMappings } from "../createReducer";
import { RESET_STATE } from "../actions";
import { SET_COMPLETED } from "./actions";
import { shapesMap } from "../../pages/constants";

const initializeCompleted = () => times(shapesMap.length, constant(false));

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
