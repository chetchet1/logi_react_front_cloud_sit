import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import { useTheme } from '@mui/material/styles';
import MrpGather from './MrpGather';
import { Box, Tab, Tabs } from '@mui/material';

import MainCard from 'ui-component/cards/MainCard';
import { searchGatherList, GatherInsert } from 'pages/logi/mrp/saga/GatherSaga';
import { searchMpsList } from 'pages/logi/mrp/saga/mpsSaga';
import { searchGetMrpList } from 'pages/logi/mrp/saga/mrpSaga';
import { searchMrpList } from 'pages/logi/mrp/saga/mrpSaga';
import { connect } from 'react-redux';
import SetMrpgrid from './mrppage';
import Link from 'next/link';

function TabPanel({ children, value, index, ...other }: any) {
  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && <Box sx={{ p: 0 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

const MrpContainer = (props: any) => {
  const {
    searchMpsList,
    MrpList,
    searchMrpList,
    MrpSimulatorList,
    MrpRegisterList,
    searchGetMrpList,
    MrpGetList,
    searchGatherList,
    GatherList,
    GatherInsert
  } = props;

  const [value, setValue] = React.useState(0);
  const theme = useTheme();
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1
    }
  }));
  const classes = useStyles();

  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
  };

  console.log(value);
  return (
    <MainCard>
      <Tabs
        value={value}
        indicatorColor="secondary"
        textColor="secondary"
        onChange={handleChange}
        variant="scrollable"
        aria-label="simple tabs example"
        sx={{
          '& a': {
            fontWeight: 'bold',
            minHeight: 'auto',
            minWidth: 10,
            px: 1,
            py: 1.5,
            mr: 2.25,
            color: theme.palette.grey[600],
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center'
          },
          '& a.Mui-selected': {
            color: theme.palette.secondary.main
          },
          '& a > svg': {
            marginBottom: '0px !important',
            marginRight: 1.25
          },
          mb: 3
        }}
      >
        <Tab component={Link} to="#" label="MRPR" {...a11yProps(0)} />
        <Tab component={Link} to="#" label="MRPG" {...a11yProps(1)} />
      </Tabs>

      {/* tab - details */}
      <TabPanel value={value} index={0}>
        <SetMrpgrid />
      </TabPanel>

      {/* tab - invoice */}
      <TabPanel value={value} index={1}>
        {/* <MrpGather /> */}
        <SetMrpgrid />
      </TabPanel>
    </MainCard>
  );
};

const mapStateToProps = (state: any) => {
  return {
    MrpList: state.RootReducers.logistic.ProductionReducerCombine.mpslist.MrpList,
    MrpSimulatorList: state.RootReducers.logistic.ProductionReducerCombine.mrpsimulatorlist.MrpSimulatorList,
    MrpGetList: state.RootReducers.logistic.ProductionReducerCombine.mrplist.MrpGetList,
    GatherList: state.RootReducers.logistic.ProductionReducerCombine.gatherlist.GatherList
  };
};

export default connect(mapStateToProps, {
  searchMpsList,
  searchMrpList,
  searchGetMrpList,
  searchGatherList,
  GatherInsert
})(MrpContainer);
