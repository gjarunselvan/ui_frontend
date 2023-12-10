import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import UserService from "../services/user.service";
import Cookies from 'js-cookie';

//import userCookie1 from "../services/auth.service";

const BoardAdmin = () => {
  const [content, setContent] = useState("");
  const [iframeSrc, setIframeSrc] = useState("");

  useEffect(() => {
    const userCookie1 = Cookies.get('userCookie');

    // Do something with the userCookie1 value
    console.log('User Cookie Value:', userCookie1);

    // const url1 = "http://172.203.170.91:9405/";
    // const url2 = "http://172.203.170.91:9404/";
    const url1 = `http://172.203.170.91:9405/?token=${userCookie1}`;
    const url2 = `http://172.203.170.91:9404/?token=${userCookie1}`;
    //console.log('userCookie1:', userCookie1);

    // Check if the user has a cookie
    if (document.cookie.includes("userCookie")) {
      UserService.getAdminBoard().then(
        (response) => {
          if (response.data.includes("Admin Board")) {
            setContent(
              <div>
                <h2 className="mb-4">Welcome to {response.data}  !!</h2>
                <div className="d-flex mb-3">
                  <button
                    onClick={() => setIframeSrc(url1)}
                    className="btn btn-primary"
                    style={{ marginRight: "10px" }}
                  >
                    Discounts
                  </button>
                  <button
                    onClick={() => setIframeSrc(url2)}
                    className="btn btn-info"
                  >
                    Promotions
                  </button>
                </div>
                {iframeSrc && (
                  <iframe
                    src={iframeSrc}
                    title="Board Admin Iframe"
                    style={iframeStyle}
                  />
                )}
              </div>
            );
          } else {
            setContent(
              <div>
                <h2 className="mb-4">This is not the user page.</h2>
                <p>
                  Please go to the <Link to="/">home page</Link>.
                </p>
              </div>
            );
          }
        },
        (error) => {
          const _content =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          if (
            _content.includes(
              "Full authentication is required to access this resource"
            )
          ) {
            setContent(
              <div>
                <h2 className="mb-4">Access Denied!!</h2>
                <p>
                  This is not the user page. Please redirect to{" "}
                  <Link to="/">home page</Link>.
                </p>
              </div>
            );
          } else {
            setContent(<div>{_content}</div>);
          }
        }
      );
    } else {
      // If there is no user cookie, display a message
      setContent(
        <div>
          <h2 className="mb-4"></h2>
          <p>
                  This is not the user page. Please redirect to{" "}
                  <Link to="/">home page</Link>.
                </p>
        </div>
      );
    }
  }, [iframeSrc]);

  const iframeStyle = {
    width: "100%",
    height: "60vh",
    border: "none",
  };

  return (
    <div className="container mt-5">
      <div className="jumbotron">
        <h3>{content}</h3>
      </div>
    </div>
  );
};

export default BoardAdmin;
