import React, { useContext, useState } from "react";
import TextField from "@mui/material/TextField";
import { Button, Paper } from "@mui/material";
import fetchArticles from "../../fetchArticles";
import NewsArticles from "../NewsArticles/NewsArticles";
import { GlobalContext } from "../../GlobalContext";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";

const Search = () => {
  const { appState } = useContext(GlobalContext);
  const [input, setInput] = useState({ text: "", sortBy: "publishedAt" });
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleClick = () => {
    if (input.text !== "") {
      setIsLoading(true);
      searchArticles();
    }
  };
  const searchArticles = async () => {
    setIsLoading(true);
    try {
      let articles = await fetchArticles(input, appState);
      setArticles(articles);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  return (
    <>
      <Paper style={{ padding: "20px", textAlign: "center" }}>
        <TextField
          required
          label="Search Articles"
          variant="outlined"
          style={{ width: "30%", height: "40px" }}
          size="small"
          name="text"
          value={input.text}
          onChange={handleInputChange}
        />
        <span>
          <FormControl variant="outlined">
            <InputLabel id="label">Sort By</InputLabel>
            <Select
              labelId="label"
              label="Sort By"
              value={input.sortBy}
              name="sortBy"
              onChange={handleInputChange}
              style={{ height: "40px", padding: "0px" }}
            >
              <MenuItem value="publishedAt">Publish Date</MenuItem>
              <MenuItem value="relevancy">Relevance</MenuItem>
              <MenuItem value="popularity">Popularity</MenuItem>
            </Select>
          </FormControl>
        </span>

        <br />
        <br />
        <Button
          variant="contained"
          style={{ height: "40px" }}
          onClick={handleClick}
        >
          Search
        </Button>
      </Paper>
      <br />
      {isLoading ? (
        <Box sx={{ display: "flex" }} justifyContent="center">
          <CircularProgress />
        </Box>
      ) : (
        <NewsArticles articles={articles} key={input.text} />
      )}
      <br />
    </>
  );
};
export default Search;
