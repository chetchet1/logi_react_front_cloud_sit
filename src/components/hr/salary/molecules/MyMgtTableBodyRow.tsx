//import { ReactElement } from 'react';

// material-ui
import { TableCell } from '@mui/material';

// project imports
import React from 'react';
import { formatNumber } from 'utils/hr/lib';
import ColumnProps from '../../../../types/hr/salary/types';
import { TableRow } from '@mui/material';

interface MyMgtTableBodyRowProps {
  rowData: any;
  columns: ColumnProps[];
  //{ id: string; label: string; minWidth: number; align: string }[];
}

// ===========================================================

const MyMgtTableBodyRow = ({ columns, rowData }: MyMgtTableBodyRowProps) => {
  return (
    <>
      {rowData.map((rowData) => (
        <TableRow key={rowData.position}>
          {columns.map((column) => (
            <TableCell key={column.id} align={column.align}>
              {isNaN(parseFloat(rowData[column.id])) ? rowData[column.id] : formatNumber(parseFloat(rowData[column.id]))}
              {/* {formatNumber(rowData[column.id]) == 'NaN' ? rowData[column.id] : formatNumber(rowData[column.id])} */}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
};

export default MyMgtTableBodyRow;
