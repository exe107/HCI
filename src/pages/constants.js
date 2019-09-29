import { Square } from "../shapes/Square";
import { Rectangle } from "../shapes/Rectangle";
import { Triangle } from "../shapes/Triangle";
import { Circle } from "../shapes/Circle";
import sound1 from "../audio/congratulations/1.mp3";
import sound2 from "../audio/congratulations/2.mp3";
import sound3 from "../audio/congratulations/3.mp3";
import sound4 from "../audio/congratulations/4.mp3";

const shapes = ["S", "R", "T", "C"];
const colors = ["#F62817", "#1589FF", "#4AA02C"];
const congratulationsSounds = [sound1, sound2, sound3, sound4];

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

const CANVAS_ID = "canvas";
const CONGRATULATIONS_AUDIO_ID = "congratulations-audio";

export {
  shapes,
  colors,
  colorsMap,
  componentsMap,
  congratulationsSounds,
  CANVAS_ID,
  CONGRATULATIONS_AUDIO_ID
};
