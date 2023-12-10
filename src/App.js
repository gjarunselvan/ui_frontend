import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

// Import your actual components
import AuthService from "./services/auth.service";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import BoardUser from "./components/BoardUser";
import BoardModerator from "./components/BoardModerator";
import BoardAdmin from "./components/BoardAdmin";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import ValidateLink from "./components/ValidateLink";
import EventBus from "./common/EventBus";
import Footer from "./common/Footer";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Wishlist from "./components/Wishlist";
import Cart from "./components/Cart";

const App = () => {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      const canAccessAdmin = window.location.href.includes("/admin");
      setShowAdminBoard(canAccessAdmin);
    }

    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, []);

  // const logOut = () => {
  //   //document.cookie = "Token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  //   AuthService.logout();
  //   setShowModeratorBoard(false);
  //   setShowAdminBoard(false);
  //   setCurrentUser(undefined);
  // };
  
  const logOut = () => {
  // Fetch all cookies
   const cookies = document.cookie.split(";");

   // Delete each cookie with path set to "/"
   cookies.forEach((cookie) => {
     const cookieParts = cookie.split("=");
     const cookieName = cookieParts[0].trim();
     document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
   });
   //Additional logout logic
    
    AuthService.logout();
    setShowModeratorBoard(false);
    setShowAdminBoard(false);
    setCurrentUser(undefined);
  };
  

  

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to={"/"} className="navbar-brand">
          Walmart
        </Link>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/home"} className="nav-link">
              Home
            </Link>
          </li>

          {showModeratorBoard && (
            <li className="nav-item">
              <Link to={"/mod"} className="nav-link">
                Moderator Board
              </Link>
            </li>
          )}

          {showAdminBoard && (
            <li className="nav-item">
              <Link to={"/admin"} className="nav-link">
                Admin Board
              </Link>
            </li>
          )}

          {currentUser && (
            <li className="nav-item">
              <Link to={"/user"} className="nav-link">
                User
              </Link>
            </li>
          )}
        </div>

        {currentUser ? (
  <div className="navbar-nav ml-auto">
    <li className="nav-item dropdown">
      <a
        className="nav-link dropdown-toggle"
        href="#"
        id="profileDropdown"
        role="button"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        {currentUser.email}
      </a>
      <div className="dropdown-menu" aria-labelledby="profileDropdown">
        <Link to="/profile" className="dropdown-item">
          Profile
        </Link>
        <Link to="/wishlist" className="dropdown-item">
          Wishlist
        </Link>
        <Link to="/cart" className="dropdown-item">
          Cart
        </Link>
        <a href="/login" className="dropdown-item" onClick={logOut}>
          LogOut
        </a>
      </div>
    </li>
  </div>
) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                Sign Up
              </Link>
            </li>
          </div>
        )}
      </nav>

      <div className="container mt-3">
        <Routes>
          <Route exact path={"/"} element={<Home />} />
          <Route exact path={"/home"} element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/wishlist" element={<Wishlist />} />
          <Route exact path="/cart" element={<Cart />} />
          <Route path="/user" element={<BoardUser />} />
          <Route path="/mod" element={<BoardModerator />} />
          <Route path="/admin" element={<BoardAdmin />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/resetPassword" element={<ResetPassword />} />
          <Route path="/EmailVerify" element={<ValidateLink />} />
        </Routes>
      </div>
      <div className="App">
        <Footer />
      </div>
    </div>
  );
};

export default App;
