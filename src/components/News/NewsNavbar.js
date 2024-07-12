// import React from 'react';
// import { AppBar, Toolbar, Tabs, Tab, Typography, Container } from '@mui/material';

// const NewsNavbar = () => {
//   return (
//     <AppBar position="static" sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
//       <Container maxWidth="lg">
//         <Toolbar>
//           <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
//            News Articles
//           </Typography>
//           <Tabs
//             value={0} // Adjust this to control the active tab
//             aria-label="Navigation tabs"
//             textColor="inherit"
//           >
//             <Tab label="Finance" sx={tabStyles}/>
//             <Tab label="Business" sx={tabStyles}/>
//             <Tab label="Technology" sx={tabStyles} />
//             <Tab label="Health" sx={tabStyles} />
//             <Tab label="Sports" sx={tabStyles}/>
//           </Tabs>
//         </Toolbar>
//       </Container>
//     </AppBar>
//   );
// };

// const tabStyles = {
//     '&:hover': {
//       color: '#fff', // Change text color on hover
//       opacity: 0.8, // Adjust opacity on hover
//     },
//   };
// export default NewsNavbar;

import React from "react";
import {
  AppBar,
  Toolbar,
  Tabs,
  Tab,
  Typography,
  Container,
} from "@mui/material";
import { fetchNews } from "../../api/MockNewsApiService";

const NewsNavbar = ({ setCategory }) => {
  const [value, setValue] = React.useState(0);
  const tabLabels = ["Science", "Business", "Technology", "Health", "Sports"];
  const handleChange = async (event, newValue) => {
    setValue(newValue);
    console.log(newValue);
    const category = tabLabels[newValue];
    setCategory(category);
    // fetchNews(category);
  };

  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "transparent", boxShadow: "none" }}
    >
      <Container maxWidth="lg">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            My App
          </Typography>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="Navigation tabs"
            textColor="inherit"
            indicatorColor="primary"
            sx={{ "& .MuiTabs-indicator": { backgroundColor: "#fff" } }}
          >
            {tabLabels.map((label, index) => (
              <Tab key={index} label={label} />
            ))}
          </Tabs>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NewsNavbar;
