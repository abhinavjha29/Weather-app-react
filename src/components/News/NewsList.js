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
import Grid from "@mui/material/Grid";

import { fetchNews } from "../../api/MockNewsApiService";
import NewsNavbar from "./NewsNavbar";
import { useSelector } from "react-redux";
import { dark } from "@mui/material/styles/createPalette";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  maxWidth: 600,
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
  const [category, setCategory] = useState("");
  const articlesPerPage = 5;
  const theme = useSelector((state) => state.theme.theme);
  console.log("categry is =", category);
  useEffect(() => {
    const getNews = async () => {
      const data = await fetchNews(category);
      console.log(data);
      setNews(data.articles);
    };

    getNews();
  }, [category]);

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
    <Box sx={{ padding: 2 }}>
      <NewsNavbar setCategory={setCategory} />
      <Grid container spacing={2}>
        <Grid item xs={12}>
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
                        sx={{
                          cursor: "pointer",
                          color: "wheat",
                        }}
                        onClick={() => handleOpen(article)}
                      >
                        {article.title}
                      </Typography>
                    }
                    secondary={
                      <Typography
                        sx={{
                          display: "inline",
                          color: theme === "dark" ? "#ffffff" : "#000000",
                        }}
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
        </Grid>
        <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
          <Pagination
            count={Math.ceil(news.length / articlesPerPage)}
            page={currentPage}
            onChange={handleChangePage}
            color="primary"
            sx={{ mt: 2 }}
          />
        </Grid>
      </Grid>
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
          {selectedArticle?.url && (
            <Box sx={{ mt: 2 }}>
              <a
                href={selectedArticle.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Read more
              </a>
            </Box>
          )}
        </Box>
      </Modal>
    </Box>
  );
}
