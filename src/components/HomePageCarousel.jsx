import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import banner1 from "../assets/images/banner1.jpeg";
import banner2 from "../assets/images/banner2.jpeg";
import banner3 from "../assets/images/banner3.webp";
import banner4 from "../assets/images/banner4.jpeg";
import banner5 from "../assets/images/banner5.jpeg";


const HomePageCarousel = () => {
  const images = [banner1, banner2, banner3, banner4, banner5]
  return (
    <>
      <Swiper modules={[Autoplay, Pagination, Navigation]} slidesPerView={2} autoplay={{ delay: 3000 }} loop={true}>
        {images.map((image, index)=> (
          <SwiperSlide key={index}>
            <img src={image} alt="banner" style={{width: "100%"}}/>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  )
}

export default HomePageCarousel