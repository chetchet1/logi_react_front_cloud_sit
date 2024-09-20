import React, { ReactElement, useEffect, useState } from 'react';
import Layout from 'layout';
import Page from 'components/ui-component/Page';
import MainCard from 'ui-component/cards/MainCard';
import Axios from 'axios';
import { BaseSalaryTO } from '../../../../types/hr/salary/types';
import ColumnProps from '../../../../types/hr/salary/types';
import MyMgtTable from 'components/hr/salary/organisms/MyMgtTable';

// ==============================|| TABLE - STICKY HEADER ||============================== //

//columns information
const columns: ColumnProps[] = [
  { id: 'positionCode', label: '직급코드', minWidth: 100, align: 'center', editable: true },
  { id: 'position', label: '직급명', minWidth: 100, align: 'center', editable: true },
  { id: 'baseSalary', label: '기본급', minWidth: 100, align: 'center', editable: true },
  { id: 'hobongRatio', label: '호봉인상율', minWidth: 100, align: 'center', editable: true }
];

function StickyHeadTable() {
  useEffect(() => {
    Axios.get(
      'http://localhost:9101/salarystdinfomgmt/base-salary'
      // { params: { selectDeptTitle } }
    )
      .then((response) => {
        console.log('!!!' + response.data.baseSalaryList);
        console.log('!!!' + response.data.baseSalaryList[0]);
        console.log('!!!' + typeof response.data.baseSalaryList[0]);

        setRowData(response.data.baseSalaryList);
        console.log(response.data.baseSalaryList + '어케 들어옴');
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const [rowData, setRowData] = useState<BaseSalaryTO[]>([]);

  // const [page, setPage] = React.useState(0);
  // const [rowsPerPage, setRowsPerPage] = React.useState(10);

  // const handleChangePage = (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, newPage: number) => {
  //   setPage(newPage);
  // };

  // const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | undefined) => {
  //   setRowsPerPage(+event?.target?.value!);
  //   setPage(0);
  // };

  return (
    <Page title="급여기준관리">
      <MainCard content={false} title="급여기준관리">
        <MyMgtTable columns={columns} rowData={rowData} />
      </MainCard>
    </Page>
  );
}

StickyHeadTable.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default StickyHeadTable;
