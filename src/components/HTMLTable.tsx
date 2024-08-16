'use client';
import usePagination from '@/hooks/usePagination';
import { TransformedPagesData } from '@/types';

interface HTMLTableProps {
  pages: TransformedPagesData[];
}

const HTMLTable: React.FC<HTMLTableProps> = ({ pages }) => {
  const { currentPage, nextPageButton, paginatedData, previousPageButton } =
    usePagination(pages);
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
        <TableHead headerLabels={Object.keys(pages[0])} />
        <TableBody pages={paginatedData} />
      </table>
    </div>
  );
};

interface TableHeadProps {
  headerLabels: string[];
}

const TableHead: React.FC<TableHeadProps> = ({ headerLabels }) => {
  return (
    <thead>
      <tr>
        {headerLabels.map((label) => (
          <th key={label}>{label.toUpperCase()}</th>
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
