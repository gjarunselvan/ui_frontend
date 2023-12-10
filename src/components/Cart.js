import React, { useState, useEffect } from "react";
import AuthService from "../services/auth.service";
import Cookies from 'js-cookie';

const Home = () => {
  const [content, setContent] = useState(null); // Change initial state to null
  const [loggedIn, setLoggedIn] = useState(false);
  const userCookie1 = Cookies.get('userCookie');

  // Do something with the userCookie1 value
  //console.log('User Cookie Value:', userCookie1);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        // Call your authentication service to get the current user
        const user = AuthService.getCurrentUser();
        // Update the loggedIn state based on whether a user is present
        setLoggedIn(!!user); // This will be true if there is a user, false otherwise
      } catch (error) {
        console.error("Error checking authentication:", error);
        setLoggedIn(false);
      }
    };

    checkAuthentication();
  }, []);

  useEffect(() => {
    if (loggedIn) {
      const Capstone = `http://20.127.159.231:3000/?token=${userCookie1}`;

      setContent(
        <iframe
          title="Flipkart"
          src={Capstone}
          width="100%"
          height="100%"
          allowFullScreen
          frameBorder="0"
        />
      );
    } else {
      // Redirect the user to the login page or show a message indicating they need to log in
      setContent(                <p>
        Please login to access the page.
      </p>);
    }
  }, [loggedIn]);

  return (
    <div className="container" style={{ height: '100vh', width: '100vw', overflow: 'hidden' }}>
      <header className="">
        {/* Add header content if needed */}
      </header>
      {content}
    </div>
  );
};

export default Home;
