//import { ReactElement } from 'react';

// material-ui
import { TableCell } from '@mui/material';

// project imports
import React from 'react';

interface MySocialInsureTableCellsProps {
  align: 'center' | 'inherit' | 'left' | 'right' | 'justify' | undefined;
  row: any;
  values: string[];
}

// ===========================================================

const MySocialInsureTableCells = ({ align, row, values }: MySocialInsureTableCellsProps) => {
  return (
    <>
      {values.map((value) => (
        <TableCell key={value} align={align}>
          {row[value]} %
        </TableCell>
      ))}
    </>
  );
};

export default MySocialInsureTableCells;
