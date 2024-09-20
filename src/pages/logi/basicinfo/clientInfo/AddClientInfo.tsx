//@일반거래처 추가 모달(Modal)
//🌟new

// import { makeStyles } from '@mui/styles';
import { Button, Container, Grid, IconButton, TextField } from '@mui/material';
import { GridCloseIcon } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addClientinfoTO } from '../action/BasicInfoAction';

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

export default function AddClientInfo(props) {
  const [clientinfoTO, setClientinfoTO] = useState<any>({});

  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    // 필수 필드 중 하나라도 비어있으면 경고 표시
    if (clientinfoTO == null) {
      return;
    } else {
      dispatch(addClientinfoTO(clientinfoTO));
      props.close();
    }
  };

  const onChange = (e) => {
    setClientinfoTO({ ...clientinfoTO, [e.target.id]: e.target.value });
  };

  useEffect(() => {
    setClientinfoTO({
      status: 'INSERT',
      customerCode: '저장 시 자동 입력',
      workplaceCode: 'BRC-01',
      socialSecurityNumber: ''
    });
    return () => setClientinfoTO({});
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
                autoComplete="customerCode"
                name="customerCode"
                variant="outlined"
                required
                fullWidth
                id="customerCode"
                label="일반거래처 코드"
                autoFocus
                value={clientinfoTO.customerCode}
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
                value={clientinfoTO.workplaceCode}
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                size="small"
                variant="outlined"
                required
                fullWidth
                id="customerName"
                label="거래처명"
                name="customerName"
                value={clientinfoTO.customerName}
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                size="small"
                variant="outlined"
                required
                fullWidth
                id="customerType"
                label="거래처유형"
                name="customerType"
                value={clientinfoTO.customerType}
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                size="small"
                variant="outlined"
                required
                fullWidth
                id="customerCeo"
                label="대표자명"
                name="customerCeo"
                value={clientinfoTO.customerCeo}
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                size="small"
                variant="outlined"
                required
                fullWidth
                id="businessLicenseNumber"
                label="사업자등록번호"
                name="businessLicenseNumber"
                value={clientinfoTO.businessLicenseNumber}
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                size="small"
                variant="outlined"
                required
                fullWidth
                name="customerBusinessConditions"
                label="업태"
                id="customerBusinessConditions"
                value={clientinfoTO.customerBusinessConditions}
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12} sm={7}>
              <TextField
                size="small"
                variant="outlined"
                required
                fullWidth
                id="customerBusinessItems"
                label="종목"
                name="customerBusinessItems"
                value={clientinfoTO.customerBusinessItems}
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
                value={clientinfoTO.customerZipCode}
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
                value={clientinfoTO.customerBasicAddress}
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
                value={clientinfoTO.customerDetailAddress}
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
                value={clientinfoTO.customerTelNumber}
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
                value={clientinfoTO.customerFaxNumber}
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
                value={clientinfoTO.customerNote}
                onChange={onChange}
              />
            </Grid>
          </Grid>
          <div style={submit}>
            <Button type="submit" fullWidth variant="contained" color="secondary">
              일반거래처 등록
            </Button>
          </div>
        </form>
      </div>
    </Container>
  );
}
