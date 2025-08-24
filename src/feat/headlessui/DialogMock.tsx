"use client";
import clsx from "clsx";
import React from "react";
import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useState, useEffect } from "react";
const DialogMock = () => {
  let [isOpen, setIsOpen] = useState(false);
  const [height, setHeight] = useState(0);
  const height2 = "max-h-[calc(100vh-10rem)]";

  useEffect(() => {
    const updateHeight = () => {
      const newHeight = window.innerHeight - 160; // 上下80pxずつ
      setHeight(newHeight);
    };

    updateHeight(); // 初回
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);
  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open dialog</button>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className={clsx("text-black", "relative z-50")}
      >
        <div className="fixed inset-0 w-screen p-4 flex justify-center items-start overflow-y-hidden">
          <DialogPanel
            className={clsx(
              "max-w-lg w-full space-y-4 border bg-white p-12",
              "self-auto  overflow-y-auto rounded-xl ",
              height2,
              // "scrollbar-custom"
              "[&::-webkit-scrollbar]:w-1.5",
              "[&::-webkit-scrollbar-thumb]:rounded-full",
              "[&::-webkit-scrollbar-thumb]:bg-gray-400"
            )}
            // style={{ maxHeight: height }}
          >
            <DialogTitle className="font-bold">Deactivate account</DialogTitle>
            <Description>
              This will permanently deactivate your account
            </Description>
            <p>
              {/* 長文テキスト */}
              This will permanently deactivate your accountThis will permanently
              deactivate your accountThis will permanently deactivate your
              accountThis will permanently deactivate your accountThis will
              permanently deactivate your accountThis will permanently
              deactivate your accountThis will permanently deactivate your
              accountThis will permanently deactivate your accountThis will
              permanently deactivate your accountThis will permanently
              deactivate your accountThis will permanently deactivate your
              accountThis will permanently deactivate your accountThis will
              permanently deactivate your accountThis will permanently
              deactivate your accountThis will permanently deactivate your
              accountThis will permanently deactivate your accountThis will
              permanently deactivate your accountThis will permanently
              deactivate your accountThis will permanently deactivate your
              accountThis will permanently deactivate your accountThis will
              permanently deactivate your accountThis will permanently
              deactivate your accountThis will permanently deactivate your
              accountThis will permanently deactivate your accountThis will
              permanently deactivate your accountThis will permanently
              deactivate your accountThis will permanently deactivate your
              accountThis will permanently deactivate your accountThis will
              permanently deactivate your accountThis will permanently
              deactivate your accountThis will permanently deactivate your
              accountThis will permanently deactivate your accountThis will
              permanently deactivate your accountThis will permanently
              deactivate your accountThis will permanently deactivate your
              accountThis will permanently deactivate your accountThis will
              permanently deactivate your account
            </p>
            <div className="flex gap-4 sticky bottom-0 bg-white py-2">
              <button onClick={() => setIsOpen(false)}>Cancel</button>
              <button onClick={() => setIsOpen(false)}>Deactivate</button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
};
export default DialogMock;
