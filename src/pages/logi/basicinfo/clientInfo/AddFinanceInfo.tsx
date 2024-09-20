//@금융거래처 추가 모달(Modal)
//🌟new

// import { makeStyles } from '@mui/styles';
import { Button, Container, Grid, IconButton, TextField } from '@mui/material';
import { GridCloseIcon } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addFinanceinfoTO } from '../action/BasicInfoAction';

// CSS 스타일을 컴포넌트 내에서 정의
const divStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
};

const formStyle = {
  width: '100%',
  margin: '20px'
};

const submit = {
  width: '100%',
  margin: '30px 0 0 0', // 위에만 margin
  display: 'flex',
  justifyContent: 'center', // 가로 중앙 정렬
  alignItems: 'center' // 세로 중앙 정렬
};

export default function AddFinanceinfo(props) {
  const [finaninfoTO, setFinaninfoTO] = useState<any>({});

  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    // 필수 필드 중 하나라도 비어있으면 경고 표시
    if (finaninfoTO == null) {
      return;
    } else {
      dispatch(addFinanceinfoTO(finaninfoTO));
      props.close();
    }
  };

  const onChange = (e) => {
    setFinaninfoTO({ ...finaninfoTO, [e.target.id]: e.target.value });
  };

  useEffect(() => {
    setFinaninfoTO({
      status: 'INSERT',
      accountAssociatesCode: '저장 시 자동 입력',
      workplaceCode: 'BRC-01'
      // socialSecurityNumber: ''
    });
    return () => setFinaninfoTO({});
  }, []);

  return (
    <Container component="main" maxWidth="xs">
      <div style={divStyle}>
        <form style={formStyle} onSubmit={onSubmit}>
          <IconButton
            onClick={props.close}
            size="large"
            style={{
              position: 'absolute',
              top: '0',
              right: '0'
            }}
          >
            <GridCloseIcon fontSize="small" />
          </IconButton>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                size="small"
                autoComplete="accountAssociatesCode"
                name="accountAssociatesCode"
                variant="outlined"
                required
                fullWidth
                id="accountAssociatesCode"
                label="금융거래처 코드"
                autoFocus
                value={finaninfoTO.accountAssociatesCode}
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                size="small"
                variant="outlined"
                required
                fullWidth
                id="workplaceCode"
                label="사업장코드"
                name="workplaceCode"
                value={finaninfoTO.workplaceCode}
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                size="small"
                variant="outlined"
                required
                fullWidth
                id="accountAssociatesName"
                label="금융거래처명"
                name="accountAssociatesName"
                value={finaninfoTO.accountAssociatesName}
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                size="small"
                variant="outlined"
                required
                fullWidth
                id="accountAssociatesType"
                label="금융거래처 유형"
                name="accountAssociatesType"
                value={finaninfoTO.accountAssociatesType}
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                size="small"
                variant="outlined"
                required
                fullWidth
                id="accountNumber"
                label="계좌번호"
                name="accountNumber"
                value={finaninfoTO.accountNumber}
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                size="small"
                variant="outlined"
                required
                fullWidth
                id="financialInstituteCode"
                label="금융기관코드"
                name="financialInstituteCode"
                value={finaninfoTO.financialInstituteCode}
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                size="small"
                variant="outlined"
                required
                fullWidth
                name="financialInstituteName"
                label="금융기관명"
                id="financialInstituteName"
                value={finaninfoTO.financialInstituteName}
                onChange={onChange}
              />
            </Grid>
            {/* <Grid item xs={12} sm={7}>
              <TextField
                size="small"
                variant="outlined"
                required
                fullWidth
                id="customerBusinessItems"
                label="종목"
                name="customerBusinessItems"
                value={finaninfoTO.customerBusinessItems}
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12} sm={7}>
              <TextField
                size="small"
                variant="outlined"
                required
                fullWidth
                id="customerZipCode"
                label="우편번호"
                name="customerZipCode"
                value={finaninfoTO.customerZipCode}
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12} sm={7}>
              <TextField
                size="small"
                variant="outlined"
                required
                fullWidth
                id="customerBasicAddress"
                label="거래처 주소"
                name="customerBasicAddress"
                value={finaninfoTO.customerBasicAddress}
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12} sm={7}>
              <TextField
                size="small"
                variant="outlined"
                required
                fullWidth
                id="customerDetailAddress"
                label="거래처 상세주소"
                name="customerDetailAddress"
                value={finaninfoTO.customerDetailAddress}
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                size="small"
                variant="outlined"
                required
                fullWidth
                id="customerTelNumber"
                label="전화번호"
                name="customerTelNumber"
                value={finaninfoTO.customerTelNumber}
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                size="small"
                variant="outlined"
                required
                fullWidth
                id="customerFaxNumber"
                label="팩스번호"
                name="customerFaxNumber"
                value={finaninfoTO.customerFaxNumber}
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                size="small"
                variant="outlined"
                required
                fullWidth
                id="customerNote"
                label="팩스번호"
                name="customerNote"
                value={finaninfoTO.customerNote}
                onChange={onChange}
              />
            </Grid> */}
          </Grid>
          <div style={submit}>
            <Button type="submit" fullWidth variant="contained" color="secondary">
              금융거래처 등록
            </Button>
          </div>
        </form>
      </div>
    </Container>
  );
}
