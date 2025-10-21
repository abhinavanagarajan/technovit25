import React from "react";
import { usePagination, DOTS } from "../hooks/usePagination";
import { Bayon } from "next/font/google";

const bayon = Bayon({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-bayon",
});

type PaginationProps = {
  onPageChange: (page: number) => void;
  totalCount: number;
  currentPage: number;
  pageSize: number;
  siblingCount?: number;
};

const Pagination = ({
  onPageChange,
  totalCount,
  currentPage,
  pageSize,
  siblingCount = 1,
}: PaginationProps) => {
  const totalPageCount = Math.ceil(totalCount / pageSize);

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || totalPageCount <= 1) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  return (
    <div
      className={`flex items-center justify-center gap-2 p-4 ${bayon.className}`}
    >
      <button
        onClick={onPrevious}
        disabled={currentPage === 1}
        className={`
                  px-3 py-2 border-2 border-black flex items-center justify-center
                  ${
                    currentPage === 1
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-[#42E25A] text-black cursor-pointer"
                  }
                `}
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={3}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      {paginationRange?.map((pageNumber, index) => {
        if (pageNumber === DOTS) {
          return (
            <span key={`dots-${index}`} className="text-black text-lg px-2">
              ...
            </span>
          );
        }

        return (
          <button
            key={pageNumber}
            onClick={() => onPageChange(Number(pageNumber))}
            className={`
                            px-4 py-2 border-2 border-black uppercase cursor-pointer text-lg
                            ${
                              pageNumber === currentPage
                                ? "bg-black text-[#42E25A]"
                                : "bg-[#42E25A] text-black"
                            }
                          `}
          >
            {pageNumber}
          </button>
        );
      })}

      <button
        onClick={onNext}
        disabled={currentPage === totalPageCount}
        className={`
                  px-3 py-2 border-2 border-black flex items-center justify-center
                  ${
                    currentPage === totalPageCount
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-[#42E25A] text-black cursor-pointer"
                  }
                `}
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={3}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  );
};

export default React.memo(Pagination);
