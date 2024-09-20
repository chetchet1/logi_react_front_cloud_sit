import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import axios from 'axios';
import Page from 'components/ui-component/Page';
import Layout from 'layout';
import { ReactElement, useEffect, useState } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import Paper from '@mui/material/Paper';

function CompanyInfo() {
  const [dataList, setDataList] = useState([]);

  const columns = [
    { id: 'companyCode', label: '회사코드', minWidth: 170, hide: true },
    { id: 'companyName', label: '회사명', minWidth: 100 },
    { id: 'companyDivision', label: '회사구분', minWidth: 100 },
    { id: 'businessLicenseNumber', label: '사업자등록번호', minWidth: 100 },
    { id: 'corporationLicenseNumber', label: '법인등록번호', minWidth: 100 },
    { id: 'companyCeoName', label: '대표자명', minWidth: 100 }
  ];

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_DOCKER_API_URL}/compinfo/company/list`)
      .then((response) => {
        setDataList(response.data.gridRowJson);
        console.log('🌟뭘 불러왔을까?🌟', dataList);
      })
      .catch((e) => {});
  }, []);
  return (
    <Page title="Collapse Table">
      <MainCard content={false} title="사업장 정보">
        <TableContainer component={Paper}>
          <Table stickyHeader aria-label="회사 정보">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell sx={{ py: 3 }} key={column.id} style={{ minWidth: column.minWidth }}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {dataList.map((dataList, index) => (
                <TableRow sx={{ py: 3 }} hover role="checkbox" tabIndex={-1} key={index}>
                  {columns.map((column) => {
                    const value = dataList[column.id];
                    return <TableCell key={column.id}>{value || 'No Data'}</TableCell>;
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </MainCard>
    </Page>
  );
}

CompanyInfo.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default CompanyInfo;
