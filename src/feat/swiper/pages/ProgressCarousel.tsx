"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import Image from "next/image";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// 画像配列（ダミー）
const images = [
  { id: 1, src: "/dummy/dummy1.jpg" },
  { id: 2, src: "/dummy/dummy2.jpg" },
  { id: 3, src: "/dummy/dummy3.jpg" },
];

export default function ProgressCarousel() {
  return (
    <div className="w-full max-w-xl mx-auto">
      {/* グローバルスタイル */}
      <style jsx global>{`
        .custom-pagination .swiper-pagination-progressbar-fill {
          background-color: #3b82f6 !important;
        }

        .custom-pagination.swiper-pagination-progressbar {
          background-color: #e5e7eb !important;
        }
      `}</style>

      {/* Swiper本体 */}
      <Swiper
        modules={[Navigation, Pagination]}
        slidesPerView={1}
        loop={false}
        pagination={{
          type: "progressbar",
          el: ".custom-pagination",
        }}
        navigation={{
          nextEl: ".custom-next",
          prevEl: ".custom-prev",
        }}
        className="relative"
      >
        {images.map(({ id, src }) => (
          <SwiperSlide key={id}>
            <div className="relative w-full h-64">
              <Image
                src={src}
                alt={`Slide ${id}`}
                fill
                className="object-cover rounded-md"
                priority={id === 1}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* プログレスバー：画像の下に表示 */}
      <div className="mt-3 px-2">
        <div className="custom-pagination w-full h-1 rounded overflow-hidden relative bg-amber-500" />
      </div>

      {/* ナビゲーションボタン：プログレスバーの下に表示 */}
      <div className="flex justify-end items-center gap-3 mt-2 px-2">
        <button className="custom-prev text-blue-600 hover:text-blue-800 text-xl">
          ＜
        </button>
        <button className="custom-next text-blue-600 hover:text-blue-800 text-xl">
          ＞
        </button>
      </div>
      <style jsx>{`
        .swiper-pagination-progressbar-fill {
          background-color: #794c44; /* 例: トマト色 */
        }
      `}</style>
    </div>
  );
}
