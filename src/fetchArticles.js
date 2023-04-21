import axios from "axios";
const fetchArticles = async (input, appState) => {
  let searchText = input.text;
  let sortBy = input.sortBy;
  if (searchText === "") {
    return "";
  }
  let res = await axios.get(
    `${appState.api_url}/everything?q=${searchText}&apiKey=${appState.api_key}&searchIn=title&language=en&sortBy=${sortBy}`
  );
  return res.data.articles;
};
export default fetchArticles;
