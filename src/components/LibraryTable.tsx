'use client';
import { MAX_PAGE_SIZE } from '@/constants';
import { TransformedPagesData } from '@/types';
import { Box, Button, TextField, Typography } from '@mui/material';
import {
  DataGrid,
  GridColDef,
  GridRowsProp,
  useGridApiRef,
} from '@mui/x-data-grid';
import { useCallback, useMemo, useState } from 'react';

const percentageFieldComparator = (a: string, b: string) =>
  parseFloat(a.replace('%', '')) - parseFloat(b.replace('%', ''));

interface LibraryTableProps {
  pages: TransformedPagesData[];
}

const LibraryTable: React.FC<LibraryTableProps> = ({ pages }) => {
  const [pageInputValue, setPageInputValue] = useState<string>('');

  const apiRef = useGridApiRef();

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

  const handlePageInputSubmit = useCallback(() => {
    const pageNumberValue = parseInt(pageInputValue);
    if (!isNaN(pageNumberValue)) {
      // Data grid pages are 0 based
      apiRef.current.setPage(pageNumberValue - 1);
    }
  }, [apiRef, pageInputValue]);

  const maxPages = useMemo(() => rows.length / MAX_PAGE_SIZE, [rows.length]);

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
    <Box>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        padding={1}
      >
        <Typography variant="h6">Pages</Typography>
        <Box display="flex" flexDirection="row" alignItems="center">
          <TextField
            type="number"
            inputProps={{
              min: 1,
              max: maxPages,
            }}
            value={pageInputValue}
            onChange={(e) => setPageInputValue(e.target.value)}
            sx={{ '& input': { padding: 1 } }}
          />
          <Button
            onClick={handlePageInputSubmit}
            disabled={submitButtonDisabled}
            variant="contained"
            sx={{ marginLeft: 2, height: '100%' }}
          >
            Go to page
          </Button>
        </Box>
      </Box>
      <DataGrid
        apiRef={apiRef}
        disableColumnFilter
        sx={{
          borderRadius: 3,
          backgroundColor: 'white',
        }}
        columns={columns}
        rows={rows}
        initialState={{
          pagination: { paginationModel: { pageSize: MAX_PAGE_SIZE } },
        }}
      />
    </Box>
  );
};

export default LibraryTable;
