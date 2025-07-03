"use client";

import React from "react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { carouselImgs } from "@/mocks";
import "swiper/css";
import "swiper/css/pagination"; // ✅ 追加
import "swiper/css/navigation"; // （必要に応じて）
import "swiper/css/scrollbar"; // （必要に応じて）

type Item = {
  id: number;
  src: string;
};

export default function SwiperSample() {
  return (
    <div className="w-full max-w-xl mx-auto">
      <Swiper
        modules={[Navigation, Pagination]}
        pagination={{ clickable: true, el: ".custom-pagination" }}
        navigation={{
          nextEl: ".custom-next",
          prevEl: ".custom-prev",
        }}
        spaceBetween={10}
        slidesPerView={1}
        loop
        className="relative"
      >
        {carouselImgs.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="relative w-full h-64">
              <Image
                src={item.src}
                alt={`Slide ${item.id}`}
                fill
                className="object-cover rounded-md"
                priority={item.id === 1}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* コントローラー：画像の下に配置 */}
      <div className="flex justify-end items-center gap-3 mt-2">
        <div className="custom-pagination" />
        <button className="custom-prev text-blue-500 hover:text-blue-700 text-2xl">
          ＜
        </button>
        <button className="custom-next text-blue-500 hover:text-blue-700 text-2xl">
          ＞
        </button>
      </div>
    </div>
  );
}
