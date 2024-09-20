import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import AddWorkPlace from 'pages/logi/basicinfo/workplaceInfo/AddWorkPlace';
import ModWorkplace from 'pages/logi/basicinfo/workplaceInfo/ModWorkplace';
import AddClientInfo from 'pages/logi/basicinfo/clientInfo/AddClientInfo';
import AddFinanceinfo from 'pages/logi/basicinfo/clientInfo/AddFinanceInfo';
// project imports

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 5
};
// 🖋️모달의 위치를 설정하는 데 사용
function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

export default function BasicModal(props) {
  const [modalStyle] = useState(getModalStyle);
  const isAddWorkplace = props.title === '사업장 추가'; // ModWorkplace을 클릭했을 때 false로 설정

  return (
    <Grid container justifyContent="flex-end">
      <Modal open={props.open} onClose={props.onClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h3" component="h6">
            {props.title}
          </Typography>
          {props.title === '사업장 추가' && (
            <AddWorkPlace
              close={props.onClose}
              modalStyle={modalStyle}
              title={props.title}
              contents={props.contents}
              workplaceInfoValue={props.workplaceInfoValue}
              value={props.children}
            />
          )}
          {props.title === '사업장 수정' && (
            <ModWorkplace
              close={props.onClose}
              modalStyle={modalStyle}
              title={props.title}
              contents={props.contents}
              selWorkRow={props.selWorkRow}
              value={props.children}
            />
          )}
          {props.title === '일반거래처 정보추가' && (
            <AddClientInfo
              close={props.onClose}
              modalStyle={modalStyle}
              title={props.title}
              contents={props.contents}
              value={props.children}
            />
          )}
          {props.title === '금융거래처 정보추가' && (
            <AddFinanceinfo
              close={props.onClose}
              modalStyle={modalStyle}
              title={props.title}
              contents={props.contents}
              value={props.children}
            />
          )}
        </Box>
      </Modal>
    </Grid>
  );
}
