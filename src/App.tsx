import "./index.css";
import React from "react";

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import Hero from "./pages/Hero";

const App:React.FC  = ()=> {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hero />} />
      </Routes>
    </Router>
  );
}

export default App
