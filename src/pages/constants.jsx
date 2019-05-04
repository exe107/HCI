import { Square } from "./shapes/Square";
import { Rectangle } from "./shapes/Rectangle";
import { Triangle } from "./shapes/Triangle";
import { Circle } from "./shapes/Circle";

const shapesMap = ["S", "R", "T", "C"];
const colorsMap = ["red", "blue", "green"];
const componentsMap = {
  S: Square,
  R: Rectangle,
  T: Triangle,
  C: Circle
};
const colorsPluralForms = {
  red: "црвени",
  blue: "плави",
  green: "зелени"
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
