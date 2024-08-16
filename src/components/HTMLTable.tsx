'use client';
import usePagination from '@/hooks/usePagination';
import useTableSort, { SortConfig } from '@/hooks/useTableSort';
import { TransformedPagesData } from '@/types';

interface HTMLTableProps {
  pages: TransformedPagesData[];
}

const HTMLTable: React.FC<HTMLTableProps> = ({ pages }) => {
  const { handleSort, sortConfig, sortedData } = useTableSort(pages);
  const { currentPage, nextPageButton, paginatedData, previousPageButton } =
    usePagination(sortedData);
  return (
    <div>
      <div>
        <h5>Pages</h5>
        {!previousPageButton.hidden && (
          <button onClick={previousPageButton.onClick}>{'<'}</button>
        )}
        <span>{currentPage}</span>
        {!nextPageButton.hidden && (
          <button onClick={nextPageButton.onClick}>{'>'}</button>
        )}
      </div>
      <table>
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
    <thead>
      <tr>
        {headerLabels.map((label) => (
          <th
            key={label}
            onClick={() => handleSort(label as keyof TransformedPagesData)}
          >
            {label.toUpperCase()}{' '}
            {sortConfig.field === label &&
              (sortConfig.direction === 'asc' ? ' ⇧' : ' ⇩')}
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
        <tr key={`${item.url}-${idx}`}>
          {Object.entries(item).map(([key, value]) => (
            <td key={key}>{value}</td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default HTMLTable;