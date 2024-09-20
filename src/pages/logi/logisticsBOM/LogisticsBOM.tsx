import React, {useState} from 'react';
import {Box, Tab, Tabs} from '@mui/material';
import {useTheme} from '@mui/material/styles';
import MainCard from 'ui-component/cards/MainCard';
import Page from 'components/ui-component/Page';
import Layout from 'layout';
import PropTypes from 'prop-types';
import LogisticsBOMRegister from './LogisticsBOMRegister';
import LogisticsBOMSearch from './LogisticsBOMSearch';
import LogisticsBOMTest from './LogisticsBOMTest';

function TabPanel({children, value, index}) {
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}>
            {
                value === index && <Box sx={{
                            p: 0
                        }}>{children}</Box>
            }
        </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired
  };
  
  
function a11yProps(index) {
    return {id: `simple-tab-${index}`, 'aria-controls': `simple-tabpanel-${index}`};
}

function LogisticsBOM() {
    const theme = useTheme();
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Page title="Client Information">
            <MainCard>
                <Tabs
                    value={value}
                    indicatorColor="secondary"
                    textColor="secondary"
                    onChange={handleChange}
                    aria-label="simple tabs example"
                    sx={{
                        '& a' : {
                            fontWeight: 'bold',
                            minHeight: 'auto',
                            minWidth: 10,
                            px: 1,
                            py: 1.5,
                            mr: 2.25,
                            color: theme
                                .palette
                                .grey[600],
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center'
                        },
                        '& a.Mui-selected' : {
                            color: theme.palette.secondary.main
                        },
                        '& a > svg' : {
                            marginBottom: '0px !important',
                            marginRight: 1.25
                        },
                        mb: 3
                    }}>
                    <Tab label="BOM 정전개/역전개" {...a11yProps(0)}/>
                    <Tab label="BOM 등록/수정" {...a11yProps(1)}/> {/* <Tab label="BOM 테스트" {...a11yProps(1)} /> */}

                </Tabs>

                <TabPanel value={value} index={0}>
                    <LogisticsBOMSearch/>
                </TabPanel>

                <TabPanel value={value} index={1}>
                    <LogisticsBOMRegister/>
                </TabPanel>

                {/* <TabPanel value={value} index={2}>
           <LogisticsBOMTest />
        </TabPanel> */
                }
            </MainCard>
        </Page>
    );
}

LogisticsBOM.getLayout = function getLayout(Page) {
    return <Layout>{Page}</Layout>;
};

export default LogisticsBOM;
