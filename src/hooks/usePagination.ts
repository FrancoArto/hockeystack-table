import { TransformedPagesData } from '@/types';
import { useCallback, useState } from 'react';

const MAX_PAGE_SIZE = 10;

interface PaginationButton {
  hidden: boolean;
  onClick: () => void;
}
interface UsePagination {
  currentPage: number;
  paginatedData: TransformedPagesData[];
  previousPageButton: PaginationButton;
  nextPageButton: PaginationButton;
}

const usePagination = (pages: TransformedPagesData[]): UsePagination => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const maxPages = pages.length / MAX_PAGE_SIZE;
  const startIndex = MAX_PAGE_SIZE * currentPage - 1;
  const endIndex = startIndex + MAX_PAGE_SIZE;

  const paginatedData = pages.slice(startIndex, endIndex);

  const handlePreviousPage = useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  }, [currentPage]);

  const handleNextPage = useCallback(() => {
    if (currentPage < maxPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  }, [currentPage, maxPages]);

  return {
    currentPage,
    paginatedData,
    previousPageButton: {
      onClick: handlePreviousPage,
      hidden: currentPage === 1,
    },
    nextPageButton: {
      onClick: handleNextPage,
      hidden: currentPage === maxPages,
    },
  };
};

export default usePagination;
