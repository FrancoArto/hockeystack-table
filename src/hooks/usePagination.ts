import { MAX_PAGE_SIZE } from '@/constants';
import { TransformedPagesData } from '@/types';
import { Dispatch, SetStateAction, useCallback, useState } from 'react';

interface PaginationButton {
  hidden: boolean;
  onClick: () => void;
}
interface UsePagination {
  currentPage: number;
  handlePageInputSubmit: () => void;
  maxPages: number;
  pageInputValue: string;
  paginatedData: TransformedPagesData[];
  previousPageButton: PaginationButton;
  nextPageButton: PaginationButton;
  setPageInputValue: Dispatch<SetStateAction<string>>;
}

const usePagination = (pages: TransformedPagesData[]): UsePagination => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageInputValue, setPageInputValue] = useState<string>('');
  const maxPages = pages.length / MAX_PAGE_SIZE;
  const startIndex = MAX_PAGE_SIZE * (currentPage - 1);
  const endIndex = startIndex + MAX_PAGE_SIZE;

  const paginatedData = pages.slice(startIndex, endIndex);

  const handlePreviousPage = useCallback(() => {
    if (currentPage > 1) {
      setPageInputValue('');
      setCurrentPage((prevPage) => prevPage - 1);
    }
  }, [currentPage]);

  const handleNextPage = useCallback(() => {
    if (currentPage < maxPages) {
      setPageInputValue('');
      setCurrentPage((prevPage) => prevPage + 1);
    }
  }, [currentPage, maxPages]);

  const handlePageInputSubmit = useCallback(() => {
    const pageNumberValue = parseInt(pageInputValue);
    if (!isNaN(pageNumberValue)) {
      setCurrentPage(pageNumberValue);
    }
  }, [pageInputValue]);

  return {
    currentPage,
    handlePageInputSubmit,
    maxPages,
    pageInputValue,
    paginatedData,
    previousPageButton: {
      onClick: handlePreviousPage,
      hidden: currentPage === 1,
    },
    nextPageButton: {
      onClick: handleNextPage,
      hidden: currentPage === maxPages,
    },
    setPageInputValue,
  };
};

export default usePagination;
