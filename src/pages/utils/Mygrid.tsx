import React from 'react';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';

type TextAlign = 'center' | 'end' | 'justify' | 'left' | 'match-parent' | 'right' | 'start';

const theme = createTheme();

function MyGrid(props: any) {
  const list = props.list;
  let size = 'calc(100vh - 220px)';
  let align: TextAlign | undefined = 'right';
  if (props.align !== undefined) {
    align = props.align;
  }
  // let marginTop = ' ';
  if (props.children !== undefined) {
    size = 'calc(100vh - 260px)';
  }
  if (props.size !== undefined) {
    size = props.size;
  }
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1
    },
    title: {
      flexGrow: 1,
      marginLeft: '5vw',
      marginTop: 'calc(6vh - 4vh)',
      height: '8vh',
      fontSize: '5vh'
    },
    btn: {
      flexGrow: 1,
      marginBottom: '1vh',
      marginTop: '1vh'
    },
    appBar: {
      flexGrow: 1,
      width: '100%',
      height: '10vh'
    }
  }));

  const column = props.column;

  // const onCellClicked = (id: any) => {
  //   if (props.onCellClicked !== undefined) props.onCellClicked(id);
  // };
  const onRowClicked = (id: any) => {
    if (props.onRowClicked !== undefined) props.onRowClicked(id);
  };
  // const onRowSelected = (id: any) => {
  //   if (props.onRowSelected !== undefined) props.onRowSelected(id);
  // };
  // const onGridReady = (params: any) => {
  //   params.api.sizeColumnsToFit();
  //   if (props.api !== undefined) props.api(params);
  // };
  // const onCellValueChanged = (params: any) => {
  //   if (props.onCellValueChanged !== undefined) props.onCellValueChanged(params);
  // };

  // const onGridSizeChanged = (params: any) => {
  //   let gridWidth = document.getElementById('grid-wrapper').offsetWidth;
  //   let columnsToShow = [];
  //   let columnsToHide = [];
  //   // let totalColsWidth = 0;
  //   let allColumns = params.columnApi.getAllColumns();
  //   for (let i = 0; i < allColumns.length; i++) {
  //     let column = allColumns[i];
  //     // totalColsWidth += column.getMinWidth();

  //     if (column.colDef.hide === true) {
  //       //if (totalColsWidth > gridWidth) {
  //       columnsToHide.push(column.colId);
  //       //}
  //     } else {
  //       columnsToShow.push(column.colId);
  //     }
  //   }
  //   params.columnApi.setColumnsVisible(columnsToShow, true);
  //   params.columnApi.setColumnsVisible(columnsToHide, false);
  //   params.api.sizeColumnsToFit();
  // };

  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <div id="grid-wrapper" className={classes.root}>
        {props.title !== undefined ? ( // props.title이 넘어오면 AppBar를 출력 함 -> 템플릿 모양 수정을 다 끝내면 AppBar 삭제
          <AppBar position="static" className={classes.appBar}>
            <Typography className={classes.title}>{props.title}</Typography>
          </AppBar>
        ) : (
          ''
        )}
        <div style={{ textAlign: align }} className={classes.btn}>
          {props.children}
        </div>
        <div
          style={{
            height: size,
            width: '100%',
            paddingTop: '25px',
            float: 'none'
            //2023-10-19 Hoyeon
            //float 타입에 'center'가 없기때문에 'none'을 사용해야 위치가 가운데로 적용된다
          }}
        >
          <Box
            sx={{
              height: 600,
              width: '100%',
              background: 'white'
            }}
          >
            <DataGrid
              rows={list}
              columns={column.columnDefs}
              pageSize={10}
              rowsPerPageOptions={[10]}
              getRowId={(row) => row.contractDetailNo}
              onRowClick={onRowClicked}
            />
            {/* <Button onClick={() => yearSetOpen(false)}>닫기</Button> */}
          </Box>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default MyGrid;

// 2023-10-25(수) Hoyeon
// useStyles 적용문제 발생으로 인해 주석처리함
// 2023-10-31(화) Hoyeon
// 필요없는 코드 수정
