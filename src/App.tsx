import "./index.css";
import React from 'react'

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import Hero from "./pages/Hero";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hero />} />
      </Routes>
    </Router>
  );
}
