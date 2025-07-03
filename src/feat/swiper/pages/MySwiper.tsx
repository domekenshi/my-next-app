"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
const images = [
  { id: 1, src: "/dummy/dummy1.jpg" },
  { id: 2, src: "/dummy/dummy2.jpg" },
  { id: 3, src: "/dummy/dummy3.jpg" },
];
export default function MySwiper() {
  return (
    <Swiper
      modules={[Pagination]}
      pagination={{
        el: ".custom-pagination",
        type: "progressbar",
      }}
      // ループや他のオプションは適宜
    >
      <SwiperSlide>
        <img src="/dummy/dummy1.jpg" alt="image1" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="/dummy/dummy2.jpg" alt="image2" />
      </SwiperSlide>

      {/* カスタムプログレスバー要素 */}
      <div className="custom-pagination"></div>
    </Swiper>
  );
}
