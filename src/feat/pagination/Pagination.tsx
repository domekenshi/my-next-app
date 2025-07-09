import { useState, useEffect, useMemo } from "react";

type Props = {
  totalItems: number;
  itemsPerPage: number;
  onPageChange?: (page: number) => void; // 外部通知は任意に
};

type Pages = (number | "...")[];
const Pagination: React.FC<Props> = ({
  totalItems,
  itemsPerPage,
  onPageChange,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const visiblePageCount = 7;

  // ページ変更時に親へ通知（任意）
  useEffect(() => {
    if (onPageChange) onPageChange(currentPage);
  }, [currentPage, onPageChange]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const pages: Pages = useMemo(() => {
    const dispPages: number[] = [];

    if (totalPages <= visiblePageCount) {
      for (let i = 1; i <= totalPages; i++) {
        dispPages.push(i);
      }
    } else {
      // left
      let left: number[] = currentPage <= 3 ? [1, 2, 3, 4, 5] : [1];

      // center
      let center: number[] = [];
      if (currentPage > 2 && currentPage < totalPages - 1) {
        center = [currentPage - 1, currentPage, currentPage + 1];
      }

      // right
      let right: number[] =
        currentPage >= totalPages - 2
          ? [
              totalPages - 4,
              totalPages - 3,
              totalPages - 2,
              totalPages - 1,
              totalPages,
            ]
          : [totalPages];

      const uniquePages = [...new Set([...left, ...center, ...right])];
      dispPages.push(...uniquePages.sort((a, b) => a - b));
    }

    // "..." を追加するロジック
    const result: Pages = [];
    for (let i = 1; i <= totalPages; i++) {
      if (dispPages.includes(i)) {
        result.push(i);
      } else {
        if (result[result.length - 1] !== "...") {
          result.push("...");
        }
      }
    }
    return result;
  }, [currentPage, totalPages]);

  return (
    <div className="flex items-center justify-center gap-4 mt-4">
      {/* ＜ */}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-3 py-1 rounded border ${
          currentPage === 1
            ? "bg-gray-200 text-gray-500 opacity-50 disabled:opacity-50"
            : "bg-white text-black disabled:opacity-50"
        }`}
      >
        ＜
      </button>

      {/* ページ番号中央 */}
      <div className="flex items-center gap-2">
        {pages?.map((page, index) =>
          page === "..." ? (
            <span key={page + index} className="px-2 text-gray-500">
              ...
            </span>
          ) : (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-3 py-1 rounded ${
                currentPage === page
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-500 hover:bg-gray-200"
              }`}
            >
              {page}
            </button>
          )
        )}
      </div>

      {/* ＞ */}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-3 py-1 rounded border ${
          currentPage === totalPages
            ? "bg-gray-200 text-gray-500 opacity-50 disabled:opacity-50"
            : "bg-white text-black disabled:opacity-50"
        } `}
      >
        ＞
      </button>
    </div>
  );
};

export default Pagination;
