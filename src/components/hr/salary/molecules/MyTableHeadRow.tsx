//import { ReactElement } from 'react';

// material-ui
import { TableCell, } from '@mui/material';

// project imports
import React from 'react';
//import { formatNumber } from 'utils/hr/lib';
import ColumnProps from '../../../../types/hr/salary/types';

interface MyTableHeadRowProps {
  columns: ColumnProps[];
  //{ id: string; label: string; minWidth: number; align: string }[];
}

// ===========================================================

const MyTableHeadRow = ({ columns }: MyTableHeadRowProps) => {
  return (
    <>
      {columns.map((column) => (
        <TableCell sx={{ py: 3 }} key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
          {column.label}
        </TableCell>
      ))}
    </>
  );
};

export default MyTableHeadRow;
