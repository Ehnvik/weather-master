import { useEffect, useState } from "react";
import "./Clouds.scss";
import cloudImage from "../../../assets/04d.png";
import { IClouds } from "../../../models/Weather/Interfaces/IClouds";

export const Clouds = () => {
  const [clouds, setClouds] = useState<IClouds[]>([]);

  useEffect(() => {
    const max: number = 90;
    const min: number = 5;
    const cloudList: IClouds[] = [];
    for (let i = 0; i < 5; i++) {
      let withAndHeight = Math.floor(Math.random() * (250 - 50 + 1) + 50);
      const top = Math.floor(Math.random() * (max - min + 1) + min);
      const left = Math.floor(Math.random() * (max - min + 1) + min);
      const duration = Math.floor(Math.random() * (70 - 30 + 1) + 30);

      if (withAndHeight % 2 !== 0) {
        withAndHeight++;
      }

      const cloud: IClouds = {
        src: cloudImage,
        width: `${withAndHeight}px`,
        height: `${withAndHeight}px`,
        top: `${top}%`,
        left: `${left}%`,
        duration: `${duration}s`,
      };

      cloudList.push(cloud);
    }
    setClouds(cloudList);
  }, []);

  const cloudAnimation = clouds.map((cloud: IClouds, index: number) => {
    return (
      <div
        key={index}
        className="cloud"
        style={{
          top: cloud.top,
          left: cloud.left,
          animationDuration: cloud.duration,
        }}>
        <img
          src={cloud.src}
          alt="cloud"
          style={{ width: cloud.width, height: cloud.height }}
        />
      </div>
    );
  });

  return <>{cloudAnimation}</>;
};
