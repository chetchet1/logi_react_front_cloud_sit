import React from 'react';
import { Button } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

interface MyButtonProps {
  variant: 'text' | 'contained' | 'outlined' | undefined;
  color: string;
  onClick: any;
  className: string;
  inputText: string;
}

// ===========================================================

const MyButton = ({ variant, color, onClick, className, inputText }: MyButtonProps) => {
  //set Color
  const theme = createTheme({
    palette: {
      primary: {
        main: color
      }
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <Button variant={variant} onClick={onClick} className={className}>
        {inputText}
      </Button>
    </ThemeProvider>
  );
};

export default MyButton;
