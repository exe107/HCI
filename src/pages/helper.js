import { CANVAS_ID, colors, congratulationsSounds, shapes } from "./constants";
import ConfettiGenerator from "confetti-js";
import square from "../audio/shapes/square.mp4";
import rectangle from "../audio/shapes/rectangle.mp4";
import triangle from "../audio/shapes/triangle.mp4";
import circle from "../audio/shapes/circle.mp4";
import redSquare from "../audio/shapes/red-square.mp4";
import redRectangle from "../audio/shapes/red-rectangle.mp4";
import redTriangle from "../audio/shapes/red-triangle.mp4";
import redCircle from "../audio/shapes/red-circle.mp4";
import blueSquare from "../audio/shapes/blue-square.mp4";
import blueRectangle from "../audio/shapes/blue-rectangle.mp4";
import blueTriangle from "../audio/shapes/blue-triangle.mp4";
import blueCircle from "../audio/shapes/blue-circle.mp4";
import greenSquare from "../audio/shapes/green-square.mp4";
import greenRectangle from "../audio/shapes/green-rectangle.mp4";
import greenTriangle from "../audio/shapes/green-triangle.mp4";
import greenCircle from "../audio/shapes/green-circle.mp4";

export const randomColor = () => {
  const randomNumber = Math.ceil(Math.random() * 10);
  return colors[randomNumber % 3];
};

export const generateShape = index => {
  const shape = shapes[index % 4];
  const color = randomColor();

  return { shape, color };
};

export const resolveShapeAudio = s => {
  const audioMap = {
    S: square,
    R: rectangle,
    T: triangle,
    C: circle
  };

  return audioMap[s];
};

export const resolveShapeAndColorAudio = s => {
  const audioMap = {
    RS: redSquare,
    RR: redRectangle,
    RT: redTriangle,
    RC: redCircle,
    BS: blueSquare,
    BR: blueRectangle,
    BT: blueTriangle,
    BC: blueCircle,
    GS: greenSquare,
    GR: greenRectangle,
    GT: greenTriangle,
    GC: greenCircle
  };

  return audioMap[s];
};

export const randomCongratulationsAudio = () => {
  const randomNumber = Math.ceil(Math.random() * 10);
  const soundsCount = congratulationsSounds.length;
  return congratulationsSounds[randomNumber % soundsCount];
};

export const generateConfetti = () => {
  const confettiSettings = {
    target: CANVAS_ID,
    max: 200,
    size: 1.5,
    rotate: true
  };

  return new ConfettiGenerator(confettiSettings);
};
