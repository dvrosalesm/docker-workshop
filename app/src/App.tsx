import React, { useState } from "react";
import Background from "./components/Background";
import logo from "./logo.svg";
import MagicMemePorfolio from "./components/MagicMemePorfolio";

const App = () => {
  return (
    <div>
      <Background />
      <MagicMemePorfolio />
    </div>
  );
};

export default App;
