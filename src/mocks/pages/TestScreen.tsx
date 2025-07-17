"use client";
import Event from "../Event/Event";
import PaginationTestScreen from "../PaginationTestScreen";
import DropTest from "./DropTest";

const TestScreen = () => {
  return (
    <div className="bg-white flex w-full h-dvh">
      <div className="bg-red-200 h-full text-blac">test</div>

      {/* <Event /> */}
      {/* <PaginationTestScreen /> */}
      <DropTest />
    </div>
  );
};

export default TestScreen;
