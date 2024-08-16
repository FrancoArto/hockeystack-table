import { TransformedPagesData } from '@/types';
import { Dispatch, SetStateAction, useState } from 'react';

const MAX_PAGE_SIZE = 10;

interface UsePagination {
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  paginatedData: TransformedPagesData[];
}

const usePagination = (pages: TransformedPagesData[]): UsePagination => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const startIndex = MAX_PAGE_SIZE * currentPage - 1;
  const endIndex = startIndex + MAX_PAGE_SIZE;

  const paginatedData = pages.slice(startIndex, endIndex);

  return {
    currentPage,
    paginatedData,
    setCurrentPage,
  };
};

export default usePagination;