import React from 'react';
import { 
    AppBar,
    Tabs,
    Tab,
    Typography,
    Box
}  from "@material-ui/core";
import PropTypes from 'prop-types';
import Upload from './Forms/Upload'
import Apply from './Forms/Apply'

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
}
TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};
function a11yProps(index) {
    return {
      id: `full-width-tab-${index}`,
      'aria-controls': `full-width-tabpanel-${index}`,
    };
}

export default function Homepage(props) {
    const { classes } = props;
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Tabs value={value} onChange={handleChange} aria-label="Home Page Tabs" variant="fullWidth">
                    <Tab label="Apply" {...a11yProps(0)} />
                    <Tab label="Upload" {...a11yProps(1)} />
                    <Tab label="Payment" {...a11yProps(2)} />
                    <Tab label="Certificate" {...a11yProps(3)} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                <Apply classes={classes} />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Upload classes={classes}/>
            </TabPanel>
            <TabPanel value={value} index={2}>
                Payment Form Here
            </TabPanel>
            <TabPanel value={value} index={3}>
                Certificate Form Here
            </TabPanel>
        </div>
    );
}