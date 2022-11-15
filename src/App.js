import React from "react";
import { Route, Routes } from "react-router";
import Navbar from "./components/Navbar";
import { AuthContextProvider } from "./context/AuthContext";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Watchlist from "./pages/Watchlist";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import MovieInfo from "./pages/MovieInfo";

function App() {
  return (
    <div >
      <AuthContextProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/logIn" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
            <Route path="/:genre/:movieId" element={<MovieInfo />}></Route>
          <Route
            path="/account"
            element={
              <ProtectedRoute>
                <Watchlist />
              </ProtectedRoute>
            }
          ></Route>
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
