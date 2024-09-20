import { Box, Tab, Tabs } from '@mui/material';
import Layout from 'layout';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import DeliveryInfo from './DeliveryInfo';
import DeliverySearch from './DeliverySearch';

interface TabPanelProps {
  children?: React.ReactNode;
  value: number;
  index: number;
}
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function TabPanel({ children, value, index }: TabPanelProps) {
  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`}>
      {value === index && <Box sx={{ p: 0 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

function Delivery(props) {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center'
          },
          '& a > svg': {
            marginBottom: '0px !important',
            marginRight: 1.25
          },
          mb: 3
        }}
      >
        <Tab label="납품" {...a11yProps(0)} />
        <Tab label="납품현황" {...a11yProps(1)} />
      </Tabs>

      <TabPanel value={value} index={0}>
        <DeliverySearch />
      </TabPanel>

      <TabPanel value={value} index={1}>
        <DeliveryInfo />
      </TabPanel>
    </MainCard>
  );
}
Delivery.getLayout = function getLayout(Page) {
  return <Layout>{Page}</Layout>;
};
export default Delivery;
