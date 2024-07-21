import { useEffect, useRef, useState } from "react";
import "./Clouds.scss";
import { IClouds } from "../../../models/Weather/Interfaces/IClouds";
import {
  calculateCloudStyles,
  createCloud,
  generateRandomCloudProperties,
} from "../../../utils/cloudAnimationHelpers";

export const Clouds = () => {
  const [clouds, setClouds] = useState<IClouds[]>([]);
  const cloudAmountRef = useRef(0);
  const lastCloudCreationTimeRef = useRef<number>(0);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    setClouds(calculateCloudStyles(5));

    const createNewCloud = () => {
      const now = Date.now();
      if (now - lastCloudCreationTimeRef.current >= 10000) {
        lastCloudCreationTimeRef.current = now;
        cloudAmountRef.current += 1;

        let { widthAndHeight, top, duration } = generateRandomCloudProperties();

        const newCloud = createCloud(110, top, widthAndHeight, duration);

        setClouds((prevClouds) => [...prevClouds, newCloud]);
      }

      animationFrameRef.current = requestAnimationFrame(createNewCloud);
    };

    animationFrameRef.current = requestAnimationFrame(createNewCloud);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

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
