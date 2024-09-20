//import { ReactElement } from 'react';

// material-ui
//import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import MyTableHeadRow from './MyTableHeadRow';

// project imports
import React from 'react';
//import { formatNumber } from 'utils/hr/lib';
import ColumnProps from '../../../../types/hr/salary/types';
import { TableHead } from '@mui/material';

interface MyTableHeadProps {
  columns: ColumnProps[];
  //{ id: string; label: string; minWidth: number; align: string }[];
}

// ===========================================================

const MyTableHead = ({ columns }: MyTableHeadProps) => {
  return (
    <TableHead>
      <MyTableHeadRow columns={columns} />
    </TableHead>
  );
};

export default MyTableHead;
