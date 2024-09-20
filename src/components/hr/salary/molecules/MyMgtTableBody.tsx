//import { ReactElement } from 'react';

// material-ui
//import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import MyMgtTableBodyRow from './MyMgtTableBodyRow';

// project imports
import React from 'react';
//import { formatNumber } from 'utils/hr/lib';
import ColumnProps from '../../../../types/hr/salary/types';
import { TableBody } from '@mui/material';

interface MyMgtTableBodyProps {
  rowData: any;
  columns: ColumnProps[];
  //{ id: string; label: string; minWidth: number; align: string }[];
}

// ===========================================================

const MyMgtTableBody = ({ columns, rowData }: MyMgtTableBodyProps) => {
  return (
    <TableBody>
      <MyMgtTableBodyRow columns={columns} rowData={rowData} />
    </TableBody>
  );
};

export default MyMgtTableBody;
