import React, { useState } from "react";
import { Button, ButtonGroup } from "@mui/material";
import NavBar from "./Components/NavBar/NavBar";
import TrendingNews from "./Components/TrendingNews/TrendingNews";
import Search from "./Components/Search/Search";
import { GlobalContext } from "./GlobalContext";

export const App = () => {
  const appState = {
    api_url: "https://newsapi.org/v2/",
    api_key: "1d8898756e0a45438dd561b09bc3832b",
    country: "in",
  };
  const [showSearch, setShow] = useState(false);

  return (
    <div>
      <GlobalContext.Provider value={{ appState: appState }}>
        <NavBar />
        <br />
        <div style={{ textAlign: "center" }}>
          <ButtonGroup size="large" aria-label="large button group">
            <Button
              variant={showSearch === false ? "contained" : "outlined"}
              onClick={() => setShow(false)}
            >
              Top News in India
            </Button>
            <Button
              variant={showSearch === true ? "contained" : "outlined"}
              onClick={() => setShow(true)}
            >
              Search Articles
            </Button>
          </ButtonGroup>
        </div>
        <br />
        {showSearch === false ? <TrendingNews /> : <Search />}
      </GlobalContext.Provider>
    </div>
  );
};
export default App;
