import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";
import userCookie1 from "../services/auth.service"
const Home = () => {
  const [content, setContent] = useState(null); // Change initial state to null
  
  useEffect(() => {
    const Capstone = `https://www.flipkart.com/`;

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
  }, []);

  return (
    <div className="container" style={{ height: '100vh', width: '100vw', overflow: 'hidden' }}>
      <header className="">
      </header>
{content}
    </div>
  );
};

export default Home;
