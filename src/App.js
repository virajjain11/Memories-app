import React from "react";
import { Container } from "@material-ui/core";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
// import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Auth from "./components/Auth/Auth";
function App() {
  return (
    <Container maxWidth="lg">
      <Navbar />
      <Routes>
        <Route path="/" exact element={<Home />}></Route>
        <Route path="/auth" element={<Auth />}></Route>
      </Routes>
    </Container>
  );
}

export default App;
