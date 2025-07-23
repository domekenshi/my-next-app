"use client";
import { useState } from "react";

const Marquee = () => {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <div className="bg-gray-700 flex w-full h-dvh">
      {/* 無限ループアニメーション */}
      <div className="relative w-full overflow-hidden bg-black text-white whitespace-nowrap">
        <div
          className={`inline-flex ${
            isPaused ? "paused" : ""
          } animate-marquee-loop`}
        >
          <span className="px-4">
            このテキストはテストです。このテキストはテストです。このテキストはテストです。
          </span>
          <span className="px-4">
            このテキストはテストです。このテキストはテストです。このテキストはテストです。
          </span>
        </div>

        {/* ボタン（右上に固定） */}
        <button
          onClick={() => setIsPaused((prev) => !prev)}
          className="absolute right-2 top-2 px-3 py-1 bg-white text-black rounded shadow hover:bg-gray-200"
        >
          {isPaused ? "再生 ▶" : "停止 ⏸"}
        </button>
      </div>
    </div>
  );
};

export default Marquee;
