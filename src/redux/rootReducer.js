import { combineReducers } from "redux";
import { shapesReducer } from "./shapes/reducer";
import { colorsReducer } from "./colors/reducer";
import { completedReducer } from "./completed/reducer";

export const rootReducer = combineReducers({
  shapes: shapesReducer(),
  colors: colorsReducer(),
  completed: completedReducer()
});
