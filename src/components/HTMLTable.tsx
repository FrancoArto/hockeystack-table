'use client';
import usePagination from '@/hooks/usePagination';
import useTableSort, { SortConfig } from '@/hooks/useTableSort';
import { TransformedPagesData } from '@/types';
import { useMemo } from 'react';

interface HTMLTableProps {
  pages: TransformedPagesData[];
}

const HTMLTable: React.FC<HTMLTableProps> = ({ pages }) => {
  const { handleSort, sortConfig, sortedData } = useTableSort(pages);
  const {
    currentPage,
    handlePageInputSubmit,
    nextPageButton,
    maxPages,
    pageInputValue,
    paginatedData,
    previousPageButton,
    setPageInputValue,
  } = usePagination(sortedData);

  const submitButtonDisabled = useMemo(() => {
    const pageInputNumberValue = parseInt(pageInputValue);

    return (
      pageInputValue.length === 0 ||
      isNaN(pageInputNumberValue) ||
      pageInputNumberValue > maxPages ||
      pageInputNumberValue < 1
    );
  }, [maxPages, pageInputValue]);

  return (
    <div className="rounded-xl shadow bg-transparent overflow-hidden">
      <div className="bg-white flex p-3 justify-between items-center">
        <h5 className="font-bold text-xl">Pages</h5>
        <div>
          {!previousPageButton.hidden && (
            <button
              onClick={previousPageButton.onClick}
              className="cursor-pointer align-text-bottom"
            >
              {'<'}
            </button>
          )}
          <span className="mx-1 text-xl">{currentPage}</span>
          {!nextPageButton.hidden && (
            <button
              onClick={nextPageButton.onClick}
              className="cursor-pointer align-text-bottom"
            >
              {'>'}
            </button>
          )}
          <input
            type="number"
            min={1}
            max={maxPages}
            value={pageInputValue}
            onChange={(e) => setPageInputValue(e.target.value)}
            className="ml-5 mr-2 text-right border-solid border border-slate-600 rounded-md py-1.5 px-2 focus-visible:outline-rose-700 hover:border-rose-700"
          />
          <button
            onClick={() => handlePageInputSubmit()}
            disabled={submitButtonDisabled}
            className="cursor-pointer rounded-md bg-rose-700 text-white py-2 px-3 hover:bg-rose-600 disabled:bg-slate-300 disabled:text-black disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Submit
          </button>
        </div>
      </div>
      <table className="break-words w-full table-fixed">
        <TableHead
          headerLabels={Object.keys(pages[0])}
          handleSort={handleSort}
          sortConfig={sortConfig}
        />
        <TableBody pages={paginatedData} />
      </table>
    </div>
  );
};

interface TableHeadProps {
  sortConfig: SortConfig;
  handleSort: (field: keyof TransformedPagesData) => void;
  headerLabels: string[];
}

const TableHead: React.FC<TableHeadProps> = ({
  handleSort,
  headerLabels,
  sortConfig,
}) => {
  return (
    <thead className="bg-slate-700">
      <tr>
        {headerLabels.map((label) => (
          <th
            key={label}
            onClick={() => handleSort(label as keyof TransformedPagesData)}
            className="first:text-left text-right font-normal text-slate-100 cursor-pointer first:w-1/3 px-4 py-3"
          >
            {label.toUpperCase()}{' '}
            {sortConfig.field === label &&
              (sortConfig.direction === 'asc' ? ' ↑' : ' ↓')}
          </th>
        ))}
      </tr>
    </thead>
  );
};

const TableBody: React.FC<HTMLTableProps> = ({ pages }) => {
  return (
    <tbody>
      {pages.map((item, idx) => (
        <tr
          key={`${item.url}-${idx}`}
          className="odd:bg-transparent even:bg-white"
        >
          {Object.entries(item).map(([key, value]) => (
            <td
              key={key}
              className="first:w-1/3 first:text-left text-right px-4 py-3 text-sm"
            >
              {key === 'url' ? (
                <a
                  href={`https://${value}`}
                  target="_blank"
                  className="cursor-pointer text-blue-600 visited:text-violet-800"
                >
                  {value}
                </a>
              ) : (
                value
              )}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default HTMLTable;
