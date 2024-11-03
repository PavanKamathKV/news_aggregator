import { useEffect, useState } from "react";

import { getArticles } from "./api";
import "./App.css";
import News from "./News";

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <h1>News Aggregator</h1>
        <News />
      </header>
    </div>
  );
}

export default App;
