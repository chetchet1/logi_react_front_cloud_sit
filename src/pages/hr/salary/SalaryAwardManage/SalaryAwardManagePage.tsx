import { ReactElement } from 'react';
import { Grid } from '@mui/material';
import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Layout from 'layout';
import Page from 'components/hr/Page';
import MainCard from 'components/hr/MainCard';
import { gridSpacing } from 'store/constant';
import MySelect from 'components/hr/salary/organisms/MySelect';
//import { FullTimeSalaryEntity } from '../../../../types/hr/salary/types';
import ColumnProps from '../../../../types/hr/salary/types';
import MyTable from 'components/hr/salary/organisms/MyTable';
import MyButton from 'components/hr/salary/atoms/MyButton';

// ==============================|| TABLE - BASIC ||============================== //

//columns information : 사원조회
const columnsSelect: ColumnProps[] = [
  { id: 'empCode', label: '사원코드', minWidth: 100, align: 'center' },
  { id: 'empName', label: '사원명', minWidth: 100, align: 'center' },
  { id: 'deptCode', label: '부서', minWidth: 100, align: 'center' },
  { id: 'position', label: '직급', minWidth: 100, align: 'center' },
  { id: 'hobong', label: '호봉', minWidth: 100, align: 'center' },
  { id: 'baseSalary', label: '기본급', minWidth: 100, align: 'center' }
];
//columns information : 사원조회
const columnsSave: ColumnProps[] = [
  { id: 'empCode', label: '사원코드', minWidth: 100, align: 'center' },
  { id: 'empName', label: '사원명', minWidth: 100, align: 'center' },
  { id: 'deptCode', label: '부서', minWidth: 100, align: 'center' },
  { id: 'position', label: '직급', minWidth: 100, align: 'center' },
  { id: 'hobong', label: '호봉', minWidth: 100, align: 'center' },
  { id: 'baseSalary', label: '기본급', minWidth: 100, align: 'center' },
  { id: 'grade', label: '등급', minWidth: 100, align: 'center' },
  { id: 'benefit', label: '성과급', minWidth: 100, align: 'center' }
];

function TableBasic() {
  // 부서 selector 띄우기
  useEffect(() => {
    Axios.get('http://localhost:9101/foudinfomgmt/deptlist')
      .then(({ data }) => {
        console.log(data);
        const dataList = data.list.map((e: any) => {
          return {
            label: e.deptName,
            value: e.deptCode
          };
        });
        setSelectDeptData({
          // dept: dataList
          ...selectDeptData,
          dept: [...selectDeptData.dept, ...dataList]
        });
      })
      .catch((e) => {
        alert(e);
      });
  }, []);

  const [selectDeptData, setSelectDeptData] = useState({
    dept: [{ label: '부서 선택', value: 'ALL' }]
  });

  const [selectEmpData, setSelectEmpData] = useState({
    emp: [{ label: '사원 선택', value: 'ALL' }]
  });

  // console.log('!!!!!EmpData.emp.value값!!!!');
  // console.log(selectEmpData.emp[0].value);
  // console.log(selectDeptData.dept[0].value);

  const [selectDeptTitle, setSelectDeptTitle] = useState(selectDeptData.dept[0].value);
  const [selectEmpCode, setSelectEmpCode] = useState(selectEmpData.emp[0].value);

  const [rowData, setRowData] = useState<SalaryBonusTO | any>({
    empCode: '',
    empName: '',
    deptCode: '',
    position: '',
    baseSalary: '',
    benefit: '',
    grade: '',
    hobong: ''
  });

  // 부서명 , 사원명 change될시
  const selectHandleChange = (e: any, NewValue: any) => {
    console.log('체인지!!!!!!!!!!!!!');
    console.log(e);
    const selectValue = NewValue.value;
    setSelectDeptTitle(selectValue);
    console.log('!!!!!!!!' + NewValue.value);

    console.log(selectDeptData);

    // 사원명
    Axios.get('http://localhost:9101/empinfomgmt/emplist', {
      params: {
        value: selectValue
      }
    })
      .then((response) => {
        console.log('response.data!!!!!!');
        console.log(response.data);
        console.log(response.data.list);
        const empList = response.data.list.map((e: any) => {
          return {
            label: e.empName,
            value: e.empCode
          };
        });

        setSelectEmpData({
          emp: empList
        });
      })
      .catch(() => {
        alert('해당부서에는 사원이 존재하지 않습니다');
        window.location.reload();
      });
  };

  // 사원명을 change했을 경우
  const selectSearchEmpChange = (e: any, NewValue: any) => {
    const selectCode = NewValue.value;
    setSelectEmpCode(selectCode);
    console.log(e);
    console.log('사원명~~~!!!');
    console.log(selectCode);

    // 사원별 성과급 조회
    Axios.get('http://localhost:9101/salaryinfomgmt/awards', {
      params: {
        empName: selectCode
      }
    }).then((response) => {
      console.log('response ' + response.data);
      setRowData(response.data.List[0]);
    });

    console.log(rowData);
  };

  const update = () => {
    Axios.get('http://localhost:9101/salarystdinfomgmt/social', { params: {} })
      .then((response) => {
        const updateRowData = {
          grade: ''
        };
        //settest([response.data.baseInsureList]);
        setRowData(updateRowData);
        //   dispatch({
        //   type: 'insureList',
        //   payload: response.data.baseInsureList
        // });
        //dispatch(insureList(response.data));
      })
      .catch((e) => {
        alert(e);
      });
  };

  return (
    <Page title="성과급등록">
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <MainCard content={false} title="사원조회">
            <MySelect
              deptName={selectDeptData.dept}
              empName={selectEmpData.emp}
              selectHandleChange={selectHandleChange}
              selectSearchEmpChange={selectSearchEmpChange}
            />
            <MyTable columns={columnsSelect} rowData={rowData} />
          </MainCard>
        </Grid>
        <Grid item xs={12}>
          <MainCard content={false} title="성과급등록">
            &nbsp;&nbsp;
            <MyButton variant="contained" color="#5F00FF" onClick={update} className="button" inputText="수정" />
            &nbsp;&nbsp;
            <MyButton variant="contained" color="#D1B2FF" onClick={selectSearchEmpChange} className="button" inputText="성과급계산" />
            &nbsp;&nbsp;
            <MyButton variant="contained" color="#5F00FF" onClick={selectSearchEmpChange} className="button" inputText="저장" />
            &nbsp;&nbsp;
            <MyButton variant="contained" color="#5F00FF" onClick={selectSearchEmpChange} className="button" inputText="등록" />
            <MyTable columns={columnsSave} rowData={rowData} />
          </MainCard>
        </Grid>
      </Grid>
    </Page>
  );
}

TableBasic.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default TableBasic;
