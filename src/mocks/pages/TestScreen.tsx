"use client";
import { useState } from "react";
import Event from "../Event/Event";
import PaginationTestScreen from "../PaginationTestScreen";
import DropTest from "./DropTest";
import Marquee from "@/feat/animation/Marquee";

const TestScreen = () => {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <div className="bg-gray-700 flex w-full h-dvh">
      {/* 子要素１ */}
      <div className="bg-red-900 h-full text-black">test</div>

      <div className="h-dvh bg-blue-900">この要素は表示領域の高さぴったり</div>

      {/* 無限ループアニメーション */}
      <Marquee />

      <div className="h-dvh bg-blue-900">この要素は表示領域の高さぴったり</div>

      {/* <Event /> */}
      {/* <PaginationTestScreen /> */}
      {/* <DropTest /> */}
    </div>
  );
};

export default TestScreen;
