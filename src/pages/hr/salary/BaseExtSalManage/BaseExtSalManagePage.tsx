import React, { ReactElement, useEffect, useState } from 'react';
import Layout from 'layout';
import Page from 'components/ui-component/Page';
import MainCard from 'ui-component/cards/MainCard';
import Axios from 'axios';
import ColumnProps from '../../../../types/hr/salary/types';
import { BaseExtSalTO } from '../../../../types/hr/salary/types';
import MyMgtTable from 'components/hr/salary/organisms/MyMgtTable';


// ==============================|| TABLE - STICKY HEADER ||============================== //

//columns information
const columns: ColumnProps[] = [
  { id: 'extSalCode', label: '초과수당 코드', minWidth: 100, align: 'center' },
  { id: 'extSalName', label: '초과수당명', minWidth: 100, align: 'center' },
  { id: 'ratio', label: '초과수당 배수', minWidth: 100, align: 'center', editable: true }
];

function StickyHeadTable() {
  useEffect(() => {
    Axios.get('http://localhost:9101/salarystdinfomgmt/over-sal')
      .then((response) => {
        setRowData(response.data.baseExtSalList);
      })
      .catch((e) => {
        alert(e);
      });
  }, []);

  // interface BaseExtSalTO {
  //   extSalCode: string;
  //   extSalName: string;
  //   ratio: string;
  // }

  const [rowData, setRowData] = useState<BaseExtSalTO[]>([]);

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
    <Page title="초과수당관리">
      <MainCard content={false} title="초과수당관리">
        <MyMgtTable columns={columns} rowData={rowData} />
      </MainCard>
    </Page>
  );
}

StickyHeadTable.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default StickyHeadTable;
