import React from "react";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Offer from "./components/Offer";
import {Outlet} from 'react-router';
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <>
    <ThemeProvider>
      <Offer />
      <Navbar />
      <Home />
      <Outlet/>
    </ThemeProvider>
    </>
  );
}

export default App;
