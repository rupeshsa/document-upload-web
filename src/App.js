import React from "react";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import UploadFiles from "./components/upload-files.component";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
const [value, setValue] = React.useState(2);

const handleChange = (event: React.SyntheticEvent, newValue: number) => {
  setValue(newValue);
};

return (
	<div
	style={{
		marginLeft: "10%",
	}}
	>
	<h2>Document Upload Service</h2>
  <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Document" value="1" />
            <Tab label="Analysis" value="2" />
            <Tab label="Notification" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1">
            <div className="container" style={{ width: "800px" }}>
            <div style={{ margin: "20px" }}>
              <h4>Upload your documents</h4>
            </div>

            <UploadFiles />
          </div>
        </TabPanel>
        <TabPanel value="2">This tab is for application Analysis!</TabPanel>
        <TabPanel value="3">This tab is for application Notifications!</TabPanel>
      </TabContext>
    </Box>
	</div>
);
};

export default App;
