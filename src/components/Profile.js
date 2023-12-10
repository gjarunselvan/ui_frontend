import React from "react";
import AuthService from "../services/auth.service";

const Profile = () => {
  const currentUser = AuthService.getCurrentUser();

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>Profile Details</strong> 
        </h3>
      </header>
      <p>
        <strong>Username:</strong> {currentUser.username}
      </p>
      <p>
        <strong>User Id:</strong> {currentUser.userId}
      </p>
      <p>
        <strong>Email:</strong> {currentUser.email}
      </p>
    </div>
  );
};

export default Profile;
