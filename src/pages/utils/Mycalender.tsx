import { TextField } from '@mui/material';
import React, { useState } from 'react';
import moment from 'moment';

function MyCalendar(props: any) {
  let today = moment(new Date()).format('yyyy-MM-DD');
  let year = moment(new Date()).format('yyyy');
  let month = moment(new Date()).format('MM');
  let monthFirstDay = year + '-' + month + '-01';
  const [startDate, setStartDate] = useState(monthFirstDay);
  const [endDate, setEndDate] = useState(today);

  //20240819 - 변경
  const onChange = (e: any) => {
    console.log("e.target.id:", e.target.id);       // ID 확인
    console.log("e.target.value:", e.target.value); // Value 확인
    
    const value = e.target.value || (e.target.id === 'startDate' ? monthFirstDay : today);
    
    console.log("Computed value:", value); // 최종 설정될 값 확인
  
    if (e.target.id === 'startDate') {
      setStartDate(value);
      console.log("startDate set to:", value); // startDate 값 확인
    } else {
      setEndDate(value);
      console.log("endDate set to:", value); // endDate 값 확인
    }
  
    if (props.onChangeDate !== undefined) {
      props.onChangeDate(e);
      console.log("props.onChangeDate called with:", e); // props.onChangeDate 호출 확인
    }
  };

  if (props.basicInfo !== undefined) {
    props.basicInfo(startDate, endDate);
  }

  return (
    <>
      <TextField id="startDate" label="시작일" onChange={onChange} type={'date'} style={{ marginRight: '1vw' }} value={startDate} />
      <TextField id="endDate" label="종료일" onChange={onChange} type={'date'} style={{ marginRight: '1vw' }} value={endDate} />
    </>
  );
}
export default MyCalendar;
