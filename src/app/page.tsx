import MySwiper from "@/feat/swiper/pages/MySwiper";
import ProgressCarousel from "@/feat/swiper/pages/ProgressCarousel";
import SwiperSample from "@/feat/swiper/pages/SwiperSample";

export default function Home() {
  return (
    <div className="bg-red-50 flex justify-center items-center min-h-screen">
      <div className="self-center">
        {/* <SwiperSample /> */}
        {/* <ProgressCarousel /> */}
        <MySwiper />
      </div>
    </div>
  );
}
