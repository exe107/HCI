import { Square } from "./shapes/Square";
import { Rectangle } from "./shapes/Rectangle";
import { Triangle } from "./shapes/Triangle";
import { Circle } from "./shapes/Circle";

const shapes = ["S", "R", "T", "C"];
const colors = ["#F62817", "#1589FF", "#4AA02C"];

const colorsMap = {
  "#F62817": "R",
  "#1589FF": "B",
  "#4AA02C": "G"
};

const componentsMap = {
  S: Square,
  R: Rectangle,
  T: Triangle,
  C: Circle
};

export {
  shapes,
  colors,
  colorsMap,
  componentsMap
};
