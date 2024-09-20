//import { ReactElement } from 'react';

// material-ui
import { TableCell } from '@mui/material';

// project imports
import React from 'react';
import { formatNumber } from 'utils/hr/lib';
import ColumnProps from '../../../../types/hr/salary/types';

interface MyTableBodyRowProps {
  rowData: any;
  columns: ColumnProps[];
  //{ id: string; label: string; minWidth: number; align: string }[];
}

// ===========================================================


const MyTableBodyRow = ({ columns, rowData }: MyTableBodyRowProps) => {
  return (
    <>
      {columns.map((column) => (
        <TableCell key={column.id} align={column.align}>
          {isNaN(parseFloat(rowData[column.id])) ? rowData[column.id] : formatNumber(parseFloat(rowData[column.id]))}
          {/* {formatNumber(rowData[column.id]) == 'NaN' ? rowData[column.id] : formatNumber(rowData[column.id])} */}
        </TableCell>
      ))}
    </>
  );
};

export default MyTableBodyRow;
