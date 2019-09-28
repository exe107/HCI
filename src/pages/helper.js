import { colors, shapes } from "./constants";
import square from "../audio/square.mp4";
import rectangle from "../audio/rectangle.mp4";
import triangle from "../audio/triangle.mp4";
import circle from "../audio/circle.mp4";
import redSquare from "../audio/red-square.mp4";
import redRectangle from "../audio/red-rectangle.mp4";
import redTriangle from "../audio/red-triangle.mp4";
import redCircle from "../audio/red-circle.mp4";
import blueSquare from "../audio/blue-square.mp4";
import blueRectangle from "../audio/blue-rectangle.mp4";
import blueTriangle from "../audio/blue-triangle.mp4";
import blueCircle from "../audio/blue-circle.mp4";
import greenSquare from "../audio/green-square.mp4";
import greenRectangle from "../audio/green-rectangle.mp4";
import greenTriangle from "../audio/green-triangle.mp4";
import greenCircle from "../audio/green-circle.mp4";

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
