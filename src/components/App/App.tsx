import type { FC } from "react";
import React, { useState } from "react";

import Join from "../Join/Join";
import Agents from "../Agents/Agents";
import "./App.css";

const App: FC = () => {
  const [query, setQuery] = useState<string>('');

  return (

    <div className="app">
      <Join />

      <Agents />

    </div>
    
  );
};

export default App;
