//@사업장 수정 모달(Modal)
//🌟new

import { Button, Container, Grid, IconButton, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { modWorkplaceTO } from '../action/BasicInfoAction';
import { GridCloseIcon } from '@mui/x-data-grid';

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

export default function ModWorkplace({ selWorkRow, close }) {
  const [modWorkplaceTo, setModWorkplaceTo] = useState<any>({});
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [closedDate, setClosedDate] = useState(true);
  const [displayClosed, setDisplayClosed] = useState('none');
  const [closedLable, setClosedLable] = useState('');

  const dispatch = useDispatch();

  const onChange = (e) => {
    if (e.target.name === 'isClosed') {
      if (e.target.value === 'Yes') {
        setDisplayClosed('block');
        setClosedDate(false);
      } else if (e.target.value === 'No') {
        setDisplayClosed('none');
        setModWorkplaceTo({ ...modWorkplaceTo, workplaceCloseDate: '' });
        setClosedDate(true);
      }
    } else if (e.target.name === 'workplaceCloseDate') {
      setModWorkplaceTo({ ...modWorkplaceTo, [e.target.id]: e.target.value });
      setClosedLable('폐업일');
    } else if (e.target.name === 'isMainOffice') {
      setModWorkplaceTo({ ...modWorkplaceTo, [e.target.name]: e.target.value });
    } else {
      setModWorkplaceTo({ ...modWorkplaceTo, [e.target.id]: e.target.value });
    }
  };

  const onSubmit = (e) => {
    //🌟 event.preventDefault()함수를 이용하여 Form이 새로 고쳐지지 않도록 세팅
    //🔨 dispatch코드를 modWorkplaceTO 수정로직으로 변경
    e.preventDefault();
    console.log('수정 발동');
    dispatch(modWorkplaceTO(modWorkplaceTo));
    close();
  };

  const handleClose = (e) => {
    setOpen(false);
    setOpen2(false);
  };

  const handleOpen = (e) => {
    if (e.target.id === 'isClosed') {
      setOpen(true);
    } else {
      setOpen2(true);
    }
  };

  //🖋️초기 상태값을 전달하려면 setModWorkplaceTo를 잘 세팅해야 한다.
  useEffect(() => {
    setModWorkplaceTo({
      ...selWorkRow,
      status: 'UPDATE',
      companyCode: 'COM-01'
    });
  }, []);
  console.log('@@@@@@@', modWorkplaceTo);

  return (
    <Container component="main" maxWidth="xs">
      <div style={divStyle}>
        <form style={formStyle} onSubmit={onSubmit}>
          <IconButton
            onClick={close}
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
                autoComplete="corporationLicenseNumber"
                name="corporationLicenseNumber"
                variant="outlined"
                required
                fullWidth
                id="corporationLicenseNumber"
                label="사업장 등록 번호"
                autoFocus
                value={modWorkplaceTo.corporationLicenseNumber}
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
                label="법인 등록 번호"
                name="businessLicenseNumber"
                value={modWorkplaceTo.businessLicenseNumber}
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                size="small"
                variant="outlined"
                required
                fullWidth
                id="workplaceName"
                label="사업장"
                name="workplaceName"
                value={modWorkplaceTo.workplaceName}
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                size="small"
                variant="outlined"
                required
                fullWidth
                id="workplaceCeoName"
                label="대표자"
                name="workplaceCeoName"
                value={modWorkplaceTo.workplaceCeoName}
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                size="small"
                variant="outlined"
                required
                fullWidth
                id="workplaceBusinessConditions"
                label="업태"
                name="workplaceBusinessConditions"
                value={modWorkplaceTo.workplaceBusinessConditions}
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                size="small"
                variant="outlined"
                required
                fullWidth
                id="workplaceBusinessItems"
                label="종목"
                name="workplaceBusinessItems"
                value={modWorkplaceTo.workplaceBusinessItems}
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                size="small"
                variant="outlined"
                required
                fullWidth
                name="workplaceBasicAddress"
                label="주소"
                id="workplaceBasicAddress"
                value={modWorkplaceTo.workplaceBasicAddress}
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12} sm={7}>
              <TextField
                size="small"
                variant="outlined"
                required
                fullWidth
                id="workplaceDetailAddress"
                label="상세 주소"
                name="workplaceDetailAddress"
                value={modWorkplaceTo.workplaceDetailAddress}
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                size="small"
                variant="outlined"
                required
                fullWidth
                id="workplaceTelNumber"
                label="전화번호"
                name="workplaceTelNumber"
                value={modWorkplaceTo.workplaceTelNumber}
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                size="small"
                variant="outlined"
                required
                fullWidth
                id="workplaceFaxNumber"
                label="팩스번호"
                name="workplaceFaxNumber"
                value={modWorkplaceTo.workplaceFaxNumber}
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel id="workplaceEstablishDate">설립일</InputLabel>
              <TextField
                size="small"
                variant="outlined"
                required
                fullWidth
                id="workplaceEstablishDate"
                name="workplaceEstablishDate"
                type="date"
                value={modWorkplaceTo.workplaceEstablishDate}
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel id="workplaceOpenDate">개업일</InputLabel>
              <TextField
                size="small"
                variant="outlined"
                required
                fullWidth
                id="workplaceOpenDate"
                name="workplaceOpenDate"
                type="date"
                value={modWorkplaceTo.workplaceOpenDate}
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel id="closedLabel">폐업여부</InputLabel>
              <Select
                size="small"
                labelId="closedLabel"
                id="isClosed"
                name="isClosed"
                open={open}
                fullWidth
                onClose={handleClose}
                onOpen={handleOpen}
                onChange={onChange}
                value={modWorkplaceTo.workplaceCloseDate} // 초기값 설정
              >
                <MenuItem value={'Yes'}>Y</MenuItem>
                <MenuItem value={'No'}>N</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel id="mainOffice">본사여부</InputLabel>
              <Select
                size="small"
                labelId="mainOffice"
                id="isMainOffice"
                name="isMainOffice"
                open={open2}
                fullWidth
                onClose={handleClose}
                onOpen={handleOpen}
                onChange={onChange}
                value={modWorkplaceTo.isMainOffice}
              >
                <MenuItem value={'Y'}>Y</MenuItem>
                <MenuItem value={'N'}>N</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={6} style={{ display: displayClosed }}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="workplaceCloseDate"
                label={closedLable}
                name="workplaceCloseDate"
                type="date"
                value={modWorkplaceTo.workplaceCloseDate}
                onChange={onChange}
                disabled={closedDate}
              />
            </Grid>
          </Grid>
          <div style={submit}>
            <Button type="submit" fullWidth variant="contained" color="secondary" onClick={onSubmit}>
              저장
            </Button>
          </div>
        </form>
      </div>
    </Container>
  );
}
