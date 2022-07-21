import React from "react";
import { Container } from "@material-ui/core";
import Navbar from "./components/Navbar/Navbar";
import PostDetails from "./components/PostDetails/PostDetails";
import Home from "./components/Home/Home";
// import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Auth from "./components/Auth/Auth";
import { Navigate } from "react-router-dom";
// h;
function App() {
  const user = JSON.parse(localStorage.getItem("profile"));
  return (
    <Container maxWidth="xl">
      <Navbar />
      <Routes>
        <Route path="/" exact element={<Navigate to="/posts" />}></Route>
        <Route path="/posts" exact element={<Home />} />
        <Route path="/posts/search" element={<Home />} />
        <Route path="/posts/:id" exact element={<PostDetails />} />

        <Route
          path="/auth"
          element={user ? <Navigate to="/" replace /> : <Auth />}
        />
      </Routes>
    </Container>
  );
}

export default App;
