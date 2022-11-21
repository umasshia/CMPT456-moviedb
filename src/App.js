import React from "react";
import { Route, Routes } from "react-router";
import { AuthContextProvider } from "./context/AuthContext";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Watchlist from "./pages/Watchlist";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import MovieInfo from "./pages/MovieInfo";
import About from "./pages/About";

function App() {
  return (
    <div>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/logIn" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/:movieId" element={<MovieInfo />}></Route>
          <Route
            path="/watchlist"
            element={
              <ProtectedRoute>
                <Watchlist />
              </ProtectedRoute>
            }
          ></Route>
          <Route path="/about" element={<About />}></Route>
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
