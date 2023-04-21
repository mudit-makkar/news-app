import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const NewsArticles = ({ articles }) => {
  const [visibleItems, setVisibleItems] = useState(10);

  if (articles === undefined || articles === null) {
    return <></>;
  }
  return (
    <>
      <Stack spacing={2} style={{ width: "70%", margin: "auto" }}>
        {articles.slice(0, visibleItems).map((article, index) => {
          return (
            <Item key={index}>
              <h2>
                <a
                  href={article.url}
                  style={{
                    textDecoration: "none",
                    cursor: "pointer",
                    color: "#373737",
                  }}
                >
                  {article.title}
                </a>
              </h2>
              <h4 style={{ width: "50%", margin: "auto" }}>
                {article.description}
              </h4>

              {article.author != null ? (
                <p>Author : {article.author}</p>
              ) : (
                <></>
              )}

              <p>
                Published At -{" "}
                <i style={{ color: "red" }}>
                  {" "}
                  {article.publishedAt.slice(0, 10)}
                </i>
              </p>

              <a href={article.url} style={{ textDecoration: "none" }}>
                Read More
              </a>
            </Item>
          );
        })}
      </Stack>

      {articles.length > visibleItems ? (
        <p style={{ textAlign: "center" }}>
          <Button
            variant="contained"
            onClick={() => setVisibleItems(visibleItems + 10)}
          >
            Load More
          </Button>
        </p>
      ) : (
        <></>
      )}
    </>
  );
};
export default NewsArticles;
