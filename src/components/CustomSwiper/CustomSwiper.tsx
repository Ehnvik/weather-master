import { ReactNode, useEffect, useRef } from "react";
import { Swiper } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";
import "./CustomSwiper.scss";
import { useLocation } from "react-router-dom";
import SwiperCore from "swiper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowAltCircleLeft,
  faArrowAltCircleRight,
} from "@fortawesome/free-solid-svg-icons";

interface ISwiperProps {
  children: ReactNode;
}

export const CustomSwiper = ({ children }: ISwiperProps) => {
  const swiperRef = useRef<SwiperCore | null>(null);
  const location = useLocation();

  useEffect(() => {
    const resetSwiper = () => {
      if (swiperRef.current) {
        swiperRef.current.slideTo(0);
      }
    };

    resetSwiper();
  }, [location]);

  return (
    <div className="swiper_container">
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        loop={false}
        slidesPerView={"auto"}
        spaceBetween={20}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
          slideShadows: false,
        }}
        pagination={{ el: ".swiper-pagination", clickable: true }}
        navigation={{
          nextEl: ".arrow-right",
          prevEl: ".arrow-left",
        }}
        modules={[EffectCoverflow, Pagination, Navigation]}
        className="swiper-wrapper"
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}>
        {children}
      </Swiper>
      <div className="arrow-container">
        <FontAwesomeIcon
          className="arrow-left arrow"
          icon={faArrowAltCircleLeft}
        />
        <div className="swiper-pagination"></div>

        <FontAwesomeIcon
          className="arrow-right arrow"
          icon={faArrowAltCircleRight}
        />
      </div>
    </div>
  );
};
