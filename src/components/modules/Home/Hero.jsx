import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import useBannerImage from "../../../hooks/banner";

const Hero = () => {
  const { data } = useBannerImage();

  return (
    <div className="bt_common_align">
      {data?.banner?.length > 0 && (
        <Swiper
          slidesPerView={1}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          // pagination={{
          //   clickable: true,
          // }}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
        >
          <div className="swiper mySwiper herosec_swipper swiper-initialized swiper-horizontal">
            <div
              className="swiper-wrapper herosec_swipper_wrapper"
              id="swiper-wrapper-75774b75bf28c96d"
              aria-live="off"
              style={{
                transitionDuration: "0ms",
                transform: "translate3d(-6344px, 0px, 0px)",
                transitionDelay: "0ms",
              }}
            >
              {data?.banner?.map((image, i) => {
                return (
                  <SwiperSlide
                    style={{ height: "auto", width: "auto" }}
                    key={i}
                  >
                    <div className="w-full h-full swiper-slide">
                      <img src={image} alt="" />
                    </div>
                  </SwiperSlide>
                );
              })}
            </div>
          </div>
        </Swiper>
      )}
    </div>
  );
};

export default Hero;
