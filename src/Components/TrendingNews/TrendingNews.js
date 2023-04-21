import React, { useContext } from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import NewsArticles from "../NewsArticles/NewsArticles";
import { GlobalContext } from "../../GlobalContext";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const TrendingNews = () => {
  const [trendingNews, setTrendingNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { appState } = useContext(GlobalContext);

  useEffect(() => {
    let ignore = false;
    axios
      .get(
        `${appState.api_url}/top-headlines?country=${appState.country}&apiKey=${appState.api_key}`
      )
      .then((res) => {
        if (ignore === false) {
          setIsLoading(false);
          setTrendingNews(res.data.articles);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    return () => {
      ignore = true;
    };
  }, [appState]);

  return (
    <>
      {isLoading ? (
        <Box sx={{ display: "flex" }} justifyContent="center">
          <CircularProgress />
        </Box>
      ) : (
        <NewsArticles articles={trendingNews} />
      )}
    </>
  );
};

export default TrendingNews;
