'use client';
import { MAX_PAGE_SIZE } from '@/constants';
import { TransformedPagesData } from '@/types';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';

const percentageFieldComparator = (a: string, b: string) =>
  parseFloat(a.replace('%', '')) - parseFloat(b.replace('%', ''));

interface LibraryTableProps {
  pages: TransformedPagesData[];
}

const LibraryTable: React.FC<LibraryTableProps> = ({ pages }) => {
  const columns: GridColDef[] = Object.keys(pages[0]).map((field) => ({
    field,
    headerName: field.toUpperCase(),
    sortable: true,
    // Use custom comparator function for percentage fields
    ...(['bounce', 'scroll'].includes(field)
      ? { sortComparator: percentageFieldComparator }
      : {}),
    flex: field === 'url' ? 4 : 1,
  }));

  const rows: GridRowsProp = pages.map((page, idx) => ({
    id: idx,
    ...page,
  }));
  return (
    <DataGrid
      sx={{
        borderRadius: 3,
        backgroundColor: 'white',
        '& .MuiDataGrid-columnHeader': { backgroundColor: 'cornsilk' },
      }}
      columns={columns}
      rows={rows}
      initialState={{
        pagination: { paginationModel: { pageSize: MAX_PAGE_SIZE } },
      }}
    />
  );
};

export default LibraryTable;
