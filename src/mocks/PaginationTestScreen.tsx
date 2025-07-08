"use client";
import Pagination from "@/feat/pagination/Pagination";
import { useState } from "react";

const PaginationTestScreen = ({
  // 長さ５０、表示「アイテムX」の空配列　テスト用のダミーデータ
  items = Array.from({ length: 50 }, (_, i) => `アイテム ${i + 1}`),
  perPage = 10,
}) => {
  // 1ページに表示するアイテムの数
  const itemsPerPage = perPage;
  // 現在のページ番号　初期値は 1ページ目
  const [currentPage, setCurrentPage] = useState(1);
  //   現在のページで表示すべき最初のアイテムのインデックス番号を計算
  const startIndex = (currentPage - 1) * itemsPerPage;
  // startIndex から、startIndex + 10 までの10件を取り出す
  const currentItems = items.slice(startIndex, startIndex + itemsPerPage);
  return (
    <>
      <div className="p-4">
        {/* 表示するリスト */}
        <ul>
          {currentItems.map((item, index) => (
            <li
              key={index}
              className="border p-2 mb-1 border-cyan-800 text-black"
            >
              {item}
            </li>
          ))}
        </ul>

        <Pagination
          totalItems={Number(items.length)}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </>
  );
};

export default PaginationTestScreen;
