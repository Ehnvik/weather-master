import { useEffect, useState } from "react";
import "./Clouds.scss";
import { IClouds } from "../../../models/Weather/Interfaces/IClouds";
import {
  calculateCloudStyles,
  createCloud,
  generateRandomCloudProperties,
} from "../../../utils/cloudAnimationHelpers";

export const Clouds = () => {
  const [clouds, setClouds] = useState<IClouds[]>([]);
  const [cloudAmount, setCloudAmount] = useState<number>(0);

  useEffect(() => {
    setClouds(calculateCloudStyles(5));

    const cloudInterval = setInterval(() => {
      setCloudAmount((prevCloudAmount) => prevCloudAmount + 1);
    }, 10000);

    return () => clearInterval(cloudInterval);
  }, []);

  useEffect(() => {
    if (cloudAmount > 0) {
      let { widthAndHeight, top, duration } = generateRandomCloudProperties();

      const newCloud = createCloud(110, top, widthAndHeight, duration);

      setClouds((prevClouds) => [...prevClouds, newCloud]);
    }
  }, [cloudAmount]);

  const handleOnAnimationEnd = (cloudId: string) => {
    setClouds((prevClouds) =>
      prevClouds.filter((cloud) => cloud.id !== cloudId),
    );
  };

  return (
    <>
      {clouds.map((cloud) => (
        <div
          key={cloud.id}
          className="cloud"
          style={{
            top: cloud.top,
            left: cloud.left,
            animationDuration: cloud.duration,
          }}
          onAnimationEnd={() => handleOnAnimationEnd(cloud.id)}>
          <img
            className="cloud__img"
            src={cloud.src}
            alt="cloud"
            style={{ width: cloud.width, height: cloud.height }}
          />
        </div>
      ))}
    </>
  );
};
