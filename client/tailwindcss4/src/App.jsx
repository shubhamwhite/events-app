import React from "react";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Offer from "./components/Offer";
import {Outlet} from 'react-router';

function App() {
  return (
    <>
      <Offer />
      <Navbar />
      <Home />
      <Outlet/>
    </>
  );
}

export default App;
