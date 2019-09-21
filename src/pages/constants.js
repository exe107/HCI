import { Square } from "./shapes/Square";
import { Rectangle } from "./shapes/Rectangle";
import { Triangle } from "./shapes/Triangle";
import { Circle } from "./shapes/Circle";

const shapesMap = ["S", "R", "T", "C"];
const colorsMap = ["#F62817", "#1589FF", "#4AA02C"];
const componentsMap = {
  S: Square,
  R: Rectangle,
  T: Triangle,
  C: Circle
};
const colorsPluralForms = {
  '#F62817': "црвени",
  '#1589FF': "плави",
  '#4AA02C': "зелени"
};
const shapesPluralForms = {
  S: "квадрати",
  R: "правоаголници",
  T: "триаголници",
  C: "кругови"
};

export {
  shapesMap,
  colorsMap,
  componentsMap,
  colorsPluralForms,
  shapesPluralForms
};
