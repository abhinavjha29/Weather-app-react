// import * as React from 'react';
// import { useEffect } from 'react';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import Divider from '@mui/material/Divider';
// import ListItemText from '@mui/material/ListItemText';
// import ListItemAvatar from '@mui/material/ListItemAvatar';
// import Avatar from '@mui/material/Avatar';
// import Typography from '@mui/material/Typography';
// import axios from 'axios';
// import { fetchNews } from '../../api/MockNewsApiService';

// export default function NewsList() {
// useEffect(()=>{
//     fetchNews()
// } ,[])
//   return (
//     <List sx={{ width: '100%',  }}>
//       <ListItem alignItems="flex-start">
//         <ListItemAvatar>
//           <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
//         </ListItemAvatar>
//         <ListItemText
//           primary="Brunch this weekend?"
//           secondary={
//             <React.Fragment>
//               <Typography
//                 sx={{ display: 'inline' }}
//                 component="span"
//                 variant="body2"
//                 color="text.primary"
//               >
//                 Ali Connors
//               </Typography>
//               {" — I'll be in your neighborhood doing errands this…"}
//             </React.Fragment>
//           }
//         />
//       </ListItem>
//       <Divider variant="inset" component="li" />
//       <ListItem alignItems="flex-start">
//         <ListItemAvatar>
//           <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
//         </ListItemAvatar>
//         <ListItemText
//           primary="Summer BBQ"
//           secondary={
//             <React.Fragment>
//               <Typography
//                 sx={{ display: 'inline' }}
//                 component="span"
//                 variant="body2"
//                 color="text.primary"
//               >
//                 to Scott, Alex, Jennifer
//               </Typography>
//               {" — Wish I could come, but I'm out of town this…"}
//             </React.Fragment>
//           }
//         />
//       </ListItem>
//       <Divider variant="inset" component="li" />
//       <ListItem alignItems="flex-start">
//         <ListItemAvatar>
//           <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
//         </ListItemAvatar>
//         <ListItemText
//           primary="Oui Oui"
//           secondary={
//             <React.Fragment>
//               <Typography
//                 sx={{ display: 'inline' }}
//                 component="span"
//                 variant="body2"
//                 color="text.primary"
//               >
//                 Sandra Adams
//               </Typography>
//               {' — Do you have Paris recommendations? Have you ever…'}
//             </React.Fragment>
//           }
//         />
//       </ListItem>
//     </List>
//   );
// }

import * as React from "react";
import { useState, useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import axios from "axios";
import { fetchNews } from "../../api/MockNewsApiService";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function NewsList() {
  const [news, setNews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);

  const articlesPerPage = 5;

  useEffect(() => {
    const getNews = async () => {
      const data = await fetchNews();
      console.log(data);
      setNews(data.articles);
    };

    getNews();
  }, []);

  const handleOpen = (article) => {
    setSelectedArticle(article);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedArticle(null);
  };

  const handleChangePage = (event, value) => {
    setCurrentPage(value);
  };

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = news.slice(indexOfFirstArticle, indexOfLastArticle);

  return (
    <div>
      <List sx={{ width: "100%" }}>
        {currentArticles.map((article, index) => (
          <React.Fragment key={index}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt={article.author} src={article.urlToImage} />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography
                    sx={{ cursor: "pointer" }}
                    onClick={() => handleOpen(article)}
                  >
                    {article.title}
                  </Typography>
                }
                secondary={
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {article.author}
                  </Typography>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </React.Fragment>
        ))}
      </List>
      <Pagination
        count={Math.ceil(news.length / articlesPerPage)}
        page={currentPage}
        onChange={handleChangePage}
        sx={{ display: "flex", justifyContent: "center", mt: 2 }}
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {selectedArticle ? selectedArticle.title : ""}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {selectedArticle
              ? selectedArticle.content || selectedArticle.description
              : ""}
          </Typography>
          {selectedArticle?.url && <Box>
            <a href={selectedArticle.url}>Read more</a>
          </Box>}
        </Box>
      </Modal>
    </div>
  );
}
