import React from 'react';

// material-ui
import { Autocomplete, Grid, TextField } from '@mui/material';

// project imports
import Page from 'components/ui-component/Page';

import { gridSpacing } from 'store/constant';

// autocomplete options
// const dept = [
//   { label: '부서 조회', id: 1 },
//   { label: '회계팀', id: 2 },
//   { label: '홍보팀', id: 3 },
//   { label: '전산팀', id: 4 },
//   { label: '보안팀', id: 5 }
// ];

interface MySelectProps {}

interface MySelectProps {
  /**
   * 드롭다운 선택지
   */
  options: DropdownItem[];
  /**
   * 드롭다운 값
   */
  value?: string | number;
  /**
   * <input />의 name 속성
   */
  name?: { label: string; id?: number; value?: string }[] | string;
  /**
   * 플레이스홀더
   */
  placeholder?: string;
  /**
   * 변형 에러 플래그
   */
  hasError?: boolean;
  /**
   * 값이 변화했을 때의 이벤트 핸들러
   */
  onChange?: (selected?: DropdownItem) => void;
  selectonChange?: (event: React.SyntheticEvent, value: any) => void;
  //selectSearchEmpChange?: (event: React.SyntheticEvent, value: any) => void;
}

// ==============================|| AUTOCOMPLETE ||============================== //

const MySelect = ({ name, selectonChange }: MySelectProps) => {
  return (
    <Page title="Autocomplete">
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12} md={6} lg={40}>
          <Grid container direction="row" spacing={1}>
            <Grid item>
              <Autocomplete
                disableClearable
                options={name}
                defaultValue={name[0]}
                renderInput={(params) => <TextField {...params} label="" />}
                onChange={selectonChange}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Page>
  );
};

// MySelect.getLayout = function getLayout(page: ReactElement) {
//   return <Layout>{page}</Layout>;
// };

export default MySelect;
