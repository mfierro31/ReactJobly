import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import Routes from "./Routes";
import LoggedInContext from "./loggedInContext";
import "./Jobly.css";

const Jobly = () => {
  const [currUser, setCurrUser] = useState(
    {
      username: 'poopybutthole',
      firstName: 'Poopy',
      lastName: 'Butthole',
      email: 'poop_butt@gmail.com',
      isAdmin: false
    }
  );

  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const changeLoggedInStatus = () => {
    setIsLoggedIn(!isLoggedIn);
  }
  
  return (
    <div>
      <NavBar loggedIn={isLoggedIn} currUser={currUser} changeLoggedInStatus={changeLoggedInStatus} />
      <main className="Jobly-Main">
        <Routes loggedIn={isLoggedIn} currUser={currUser} />
      </main>
    </div>
  );
};

export default Jobly;