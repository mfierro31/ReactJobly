import React, { useContext } from "react";
import LoggedInContext from "./loggedInContext";
import { NavLink } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const { currUser } = useContext(LoggedInContext);
  
  return (
    <div className="Home">
      <div className="Home-container">
        <h1 className="font-weight-bold Home-title mb-4">Jobly</h1>
        <p className="font-weight-light Home-p mb-4">All the jobs in one, convenient place.</p>
        {currUser ? 
          <h3 className="Home-h3">Welcome back, {currUser.firstName}!</h3> : 
          <p>
            <NavLink to="/login" className="btn btn-primary font-weight-bold mr-3">Log in</NavLink>
            <NavLink to="/signup" className="btn btn-primary font-weight-bold">Sign up</NavLink>
          </p>
        }
      </div>
    </div>
  );
};

export default Home;