import { IClouds } from "../models/Weather/Interfaces/IClouds";
import cloudImage from "../assets/04d.png";

export const createCloud = (
  left: number,
  top: number,
  widthAndHeight: number,
  duration: number,
): IClouds => {
  return {
    id: `${Date.now()}-${Math.random()}`,
    src: cloudImage,
    width: `${widthAndHeight}px`,
    height: `${widthAndHeight}px`,
    top: `${top}%`,
    left: `${left}%`,
    duration: `${duration}s`,
  };
};

export const generateRandomCloudProperties = () => {
  const max = 90;
  const min = 5;
  let widthAndHeight = Math.floor(Math.random() * (150 - 100 + 1) + 100);
  const top = Math.floor(Math.random() * (60 - 5 + 1) + 5);
  const left = Math.floor(Math.random() * (max - min + 1) + min);
  const duration = Math.floor(Math.random() * (250 - 210 + 1) + 210);

  return { widthAndHeight, top, left, duration };
};

export const calculateCloudStyles = (cloudAmount: number): IClouds[] => {
  const newClouds: IClouds[] = [];

  for (let i = 0; i < cloudAmount; i++) {
    let { widthAndHeight, top, left, duration } =
      generateRandomCloudProperties();

    if (widthAndHeight % 2 !== 0) {
      widthAndHeight++;
    }

    newClouds.push(createCloud(left, top, widthAndHeight, duration));
  }

  return newClouds;
};
