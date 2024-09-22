import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { useDispatch } from 'store';

import { Button, FormControl, FormHelperText, Grid, InputLabel, Select, Stack, MenuItem } from '@mui/material';

import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { openSnackbar } from 'store/slices/snackbar';
import { gridSpacing } from 'store/constant';

import { useFormik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object({
  age: yup.number().required('Age selection is required.')
});

const MySelector = ({ itemName }) => {
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const dispatch = useDispatch();

  // useEffect(()=>{
  //   if(value==='DK-01'){
  //     setPrice(1000000)
  //   }else if(value==='DK-02'){
  //     setPrice(900000)
  //   }else if(value==='DK-AP01'){
  //     setPrice(75000)
  //   }else {setPrice(71000)}
  //   setSumPrice(amount*price)
  // },[value, amount, price])

  console.log('itemName', itemName);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const result = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/compinfo/codedetail/list`, {
        params: {
          divisionCodeNo: 'IT-_I'
        }
      });

      // 서버에서 가져온 데이터 중 detailCodeName만 options 배열로 설정
      const optionData = result.data.codeList.map((item) => item.detailCodeName);
      setOptions(optionData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
    console.log('select', event.target.value);
  };

  return (
    <FormControl>
      <InputLabel id="age-select">{itemName}</InputLabel>
      <Select sx={{ m: 1, minWidth: 140 }} id="age" name="age" value={selectedOption} onChange={handleSelectChange} label="Age">
        {options.map((option, index) => (
          <MenuItem key={index} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default MySelector;
