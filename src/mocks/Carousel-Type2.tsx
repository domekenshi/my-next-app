import React, { ReactNode } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, Lazy } from "swiper/modules";
import type { SwiperOptions } from "swiper/types";

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// 自動再生設定の型定義
interface AutoplayConfig {
  delay: number;
  disableOnInteraction: boolean;
  pauseOnMouseEnter: boolean;
}

// ブレイクポイント設定の型定義
interface BreakpointConfig {
  slidesPerView?: number;
  spaceBetween?: number;
  centeredSlides?: boolean;
  slidesPerGroup?: number;
}

interface Breakpoints {
  [key: number]: BreakpointConfig;
}

// カスタムSwiperコンポーネントのProps型定義
interface CustomSwiperProps {
  children: ReactNode;
  autoplay?: boolean;
  autoplayDelay?: number;
  showPagination?: boolean;
  showNavigation?: boolean;
  loop?: boolean;
  spaceBetween?: number;
  slidesPerView?: number | "auto";
  className?: string;
  navigationClassName?: string;
  paginationClassName?: string;
  breakpoints?: SwiperOptions["breakpoints"];
  centeredSlides?: boolean;
  slidesPerGroup?: number;
  speed?: number;
  grabCursor?: boolean;
  watchSlidesProgress?: boolean;
  parallax?: boolean;
  lazy?: boolean;
  effect?:
    | "slide"
    | "fade"
    | "cube"
    | "coverflow"
    | "flip"
    | "cards"
    | "creative";
  direction?: "horizontal" | "vertical";
  mousewheel?: boolean;
  keyboard?: boolean;
  onSlideChange?: (swiper: any) => void;
  onSwiper?: (swiper: any) => void;
  onReachEnd?: (swiper: any) => void;
  onReachBeginning?: (swiper: any) => void;
}

// ナビゲーション設定の型定義
interface NavigationConfig {
  nextEl: string;
  prevEl: string;
}

// ページネーション設定の型定義
interface PaginationConfig {
  el: string;
  clickable: boolean;
  renderBullet: (index: number, className: string) => string;
  type?: "bullets" | "fraction" | "progressbar" | "custom";
  dynamicBullets?: boolean;
}

const CustomSwiper: React.FC<CustomSwiperProps> = ({
  children,
  autoplay = false,
  autoplayDelay = 3000,
  showPagination = true,
  showNavigation = true,
  loop = true,
  spaceBetween = 16,
  slidesPerView = 1,
  className = "",
  navigationClassName = "",
  paginationClassName = "",
  breakpoints = undefined,
  centeredSlides = false,
  slidesPerGroup = 1,
  speed = 300,
  grabCursor = true,
  watchSlidesProgress = false,
  parallax = false,
  lazy = false,
  effect = "slide",
  direction = "horizontal",
  mousewheel = false,
  keyboard = false,
  onSlideChange,
  onSwiper,
  onReachEnd,
  onReachBeginning,
  ...props
}) => {
  // 有効なモジュールを動的に設定
  const modules: any[] = [];
  if (showNavigation) modules.push(Navigation);
  if (showPagination) modules.push(Pagination);
  if (autoplay) modules.push(Autoplay);
  if (lazy) modules.push(Lazy);

  // 自動再生設定
  const autoplayConfig: AutoplayConfig | false = autoplay
    ? {
        delay: autoplayDelay,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }
    : false;

  // ナビゲーション設定
  const navigationConfig: NavigationConfig | false = showNavigation
    ? {
        nextEl: ".swiper-button-next-custom",
        prevEl: ".swiper-button-prev-custom",
      }
    : false;

  // ページネーション設定
  const paginationConfig: PaginationConfig | false = showPagination
    ? {
        el: ".swiper-pagination-custom",
        clickable: true,
        renderBullet: function (index: number, className: string): string {
          return `<span class="${className} custom-bullet"></span>`;
        },
      }
    : false;

  // Swiperの設定オプション
  const swiperOptions: SwiperOptions = {
    modules,
    spaceBetween,
    slidesPerView,
    loop,
    autoplay: autoplayConfig,
    navigation: navigationConfig,
    pagination: paginationConfig,
    breakpoints,
    centeredSlides,
    slidesPerGroup,
    speed,
    grabCursor,
    watchSlidesProgress,
    parallax,
    lazy: lazy
      ? {
          loadPrevNext: true,
          loadOnTransitionStart: true,
        }
      : undefined,
    effect,
    direction,
    mousewheel,
    keyboard,
    onSlideChange,
    onSwiper,
    onReachEnd,
    onReachBeginning,
    ...props,
  };

  // スライドの内容を処理
  const slides = React.Children.map(
    children,
    (child: ReactNode, index: number) => (
      <SwiperSlide key={index}>{child}</SwiperSlide>
    )
  );

  return (
    <div className={`relative ${className}`}>
      {/* メインSwiper */}
      <Swiper {...swiperOptions} className="rounded-lg">
        {slides}
      </Swiper>

      {/* カスタムナビゲーション */}
      {showNavigation && (
        <div
          className={`flex justify-between items-center mt-4 ${navigationClassName}`}
        >
          <button
            className="swiper-button-prev-custom flex items-center justify-center w-10 h-10 rounded-full bg-white border-2 border-gray-300 hover:border-blue-500 hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-all duration-200 disabled:bg-gray-100 disabled:border-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed"
            type="button"
            aria-label="前のスライドへ"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <div className="flex-1 mx-4">
            <div className="text-center text-sm text-gray-500">スライド</div>
          </div>

          <button
            className="swiper-button-next-custom flex items-center justify-center w-10 h-10 rounded-full bg-white border-2 border-gray-300 hover:border-blue-500 hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-all duration-200 disabled:bg-gray-100 disabled:border-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed"
            type="button"
            aria-label="次のスライドへ"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      )}

      {/* カスタムページネーション */}
      {showPagination && (
        <div className={`flex justify-center mt-4 ${paginationClassName}`}>
          <div className="swiper-pagination-custom"></div>
        </div>
      )}

      {/* カスタムスタイル */}
      <style jsx>{`
        .swiper-button-prev-custom:disabled,
        .swiper-button-next-custom:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .custom-bullet {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: #d1d5db;
          margin: 0 4px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .custom-bullet:hover {
          background-color: #9ca3af;
        }

        .custom-bullet.swiper-pagination-bullet-active {
          background-color: #3b82f6;
          width: 24px;
          border-radius: 12px;
        }
      `}</style>
    </div>
  );
};

// カードデータの型定義
interface CardData {
  id: number;
  title: string;
  description: string;
  tag: string;
  tagColor: string;
}

// 使用例のデモ
const SwiperDemo: React.FC = () => {
  // サンプルデータ
  const cardData: CardData[] = [
    {
      id: 1,
      title: "カード 1",
      description: "レスポンシブ対応のカード形式スライドです。",
      tag: "タグ1",
      tagColor: "bg-blue-100 text-blue-800",
    },
    {
      id: 2,
      title: "カード 2",
      description: "画面サイズに応じて表示数が変わります。",
      tag: "タグ2",
      tagColor: "bg-green-100 text-green-800",
    },
    {
      id: 3,
      title: "カード 3",
      description: "モバイル: 1枚、タブレット: 2枚、デスクトップ: 3枚",
      tag: "タグ3",
      tagColor: "bg-purple-100 text-purple-800",
    },
    {
      id: 4,
      title: "カード 4",
      description: "Swiper Reactの強力な機能を活用しています。",
      tag: "タグ4",
      tagColor: "bg-red-100 text-red-800",
    },
    {
      id: 5,
      title: "カード 5",
      description: "スムーズなスライド動作とタッチ対応。",
      tag: "タグ5",
      tagColor: "bg-yellow-100 text-yellow-800",
    },
  ];

  // レスポンシブブレイクポイント設定
  const responsiveBreakpoints: SwiperOptions["breakpoints"] = {
    640: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
  };

  // スライド変更時のハンドラー
  const handleSlideChange = (swiper: any): void => {
    console.log("スライドが変更されました:", swiper.activeIndex);
  };

  // Swiper初期化時のハンドラー
  const handleSwiper = (swiper: any): void => {
    console.log("Swiperが初期化されました:", swiper);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold text-center text-gray-800">
        Swiper React コンポーネント（TypeScript対応）
      </h1>

      {/* 基本的な使用例 */}
      <div>
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          基本的な使用例
        </h2>
        <CustomSwiper
          autoplay={true}
          autoplayDelay={4000}
          loop={true}
          onSlideChange={handleSlideChange}
          onSwiper={handleSwiper}
        >
          <div className="h-64 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
            スライド 1
          </div>
          <div className="h-64 bg-gradient-to-r from-green-500 to-teal-600 flex items-center justify-center text-white text-2xl font-bold">
            スライド 2
          </div>
          <div className="h-64 bg-gradient-to-r from-red-500 to-pink-600 flex items-center justify-center text-white text-2xl font-bold">
            スライド 3
          </div>
          <div className="h-64 bg-gradient-to-r from-yellow-500 to-orange-600 flex items-center justify-center text-white text-2xl font-bold">
            スライド 4
          </div>
        </CustomSwiper>
      </div>

      {/* レスポンシブ対応 */}
      <div>
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          レスポンシブ対応（複数スライド表示）
        </h2>
        <CustomSwiper
          autoplay={false}
          slidesPerView={1}
          spaceBetween={20}
          breakpoints={responsiveBreakpoints}
          grabCursor={true}
          keyboard={true}
        >
          {cardData.map((card) => (
            <div
              key={card.id}
              className="bg-white p-6 h-48 border rounded-lg shadow-md"
            >
              <h3 className="text-lg font-bold mb-2 text-gray-800">
                {card.title}
              </h3>
              <p className="text-gray-600">{card.description}</p>
              <div className="mt-4">
                <span
                  className={`${card.tagColor} px-3 py-1 rounded-full text-sm`}
                >
                  {card.tag}
                </span>
              </div>
            </div>
          ))}
        </CustomSwiper>
      </div>

      {/* カスタマイズ例 */}
      <div>
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          カスタマイズ例
        </h2>
        <CustomSwiper
          autoplay={true}
          autoplayDelay={2000}
          showPagination={false}
          loop={false}
          navigationClassName="bg-gray-50 p-4 rounded-lg"
          className="border-2 border-gray-200"
          effect="slide"
          speed={500}
        >
          <div className="h-32 bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold">
            カスタム 1
          </div>
          <div className="h-32 bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center text-white font-bold">
            カスタム 2
          </div>
          <div className="h-32 bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold">
            カスタム 3
          </div>
        </CustomSwiper>
      </div>

      {/* TypeScript型定義の説明 */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          TypeScript型定義について
        </h2>
        <div className="space-y-3 text-sm text-gray-600">
          <div>
            <strong>CustomSwiperProps:</strong>{" "}
            メインコンポーネントのprops型定義
          </div>
          <div>
            <strong>AutoplayConfig:</strong> 自動再生設定の型定義
          </div>
          <div>
            <strong>BreakpointConfig:</strong>{" "}
            レスポンシブブレイクポイント設定の型定義
          </div>
          <div>
            <strong>NavigationConfig:</strong> ナビゲーション設定の型定義
          </div>
          <div>
            <strong>PaginationConfig:</strong> ページネーション設定の型定義
          </div>
          <div>
            <strong>CardData:</strong> カードデータの型定義（使用例用）
          </div>
        </div>

        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>必要パッケージ:</strong>
            <br />
            <code className="bg-blue-100 px-2 py-1 rounded">
              npm install swiper
            </code>
            <br />
            <code className="bg-blue-100 px-2 py-1 rounded">
              npm install -D @types/node
            </code>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SwiperDemo;
