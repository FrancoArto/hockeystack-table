import { TransformedPagesData } from '@/types';
import { useCallback, useState } from 'react';

export interface SortConfig {
  field: keyof TransformedPagesData;
  direction: 'asc' | 'desc';
}
interface UseTableSort {
  handleSort: (field: keyof TransformedPagesData) => void;
  sortConfig: SortConfig;
  sortedData: TransformedPagesData[];
}

const useTableSort = (pages: TransformedPagesData[]): UseTableSort => {
  // Default sort by visitors descending (As seen on video)
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    field: 'visitors',
    direction: 'desc',
  });

  const sortedData = pages.sort((a, b) => {
    let valueA = a[sortConfig.field];
    let valueB = b[sortConfig.field];

    if (typeof valueA === 'string' && typeof valueB === 'string') {
      valueA = valueA.endsWith('%')
        ? parseFloat(valueA.replace('%', ''))
        : valueA;
      valueB = valueB.endsWith('%')
        ? parseFloat(valueB.replace('%', ''))
        : valueB;
    }

    if (sortConfig.direction === 'asc') {
      return valueA < valueB ? -1 : 1;
    } else {
      return valueA > valueB ? -1 : 1;
    }
  });

  const handleSort = useCallback(
    (field: keyof TransformedPagesData) => {
      let newSortConfig: SortConfig;

      if (sortConfig.field === field) {
        newSortConfig = {
          field,
          direction: sortConfig.direction === 'asc' ? 'desc' : 'asc',
        };
      } else {
        newSortConfig = {
          field,
          direction: 'desc',
        };
      }

      setSortConfig(newSortConfig);
    },
    [sortConfig]
  );

  return {
    handleSort,
    sortConfig,
    sortedData,
  };
};

export default useTableSort;