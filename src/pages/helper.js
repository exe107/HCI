import { colorsMap, shapesMap } from "./constants";

export const randomColor = () => {
  const randomNumber = Math.ceil(Math.random() * 10);
  return colorsMap[randomNumber % 3];
};

export const generateShape = index => {
  const shape = shapesMap[index % 4];
  const color = randomColor();

  return { shape, color };
};
