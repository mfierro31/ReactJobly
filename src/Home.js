import React from "react";
import { useHistory } from "react-router-dom";
import "./Home.css";

const Home = ({ loggedIn, currUser }) => {
  const history = useHistory();

  const routingClick = route => {
    history.push(route);
  };

  return (
    <div className="Home">
      <div className="Home-container">
        <h1 className="font-weight-bold Home-title mb-4">Jobly</h1>
        <p className="font-weight-light Home-p mb-4">All the jobs in one, convenient place.</p>
        {loggedIn ? 
          <h3 className="Home-h3">Welcome back, {currUser.firstName}!</h3> : 
          <p>
            <button onClick={() => routingClick("/login")} className="btn btn-primary font-weight-bold mr-3">Log in</button>
            <button onClick={() => routingClick("/signup")} className="btn btn-primary font-weight-bold">Sign up</button>
          </p>
        }
      </div>
    </div>
  );
};

export default Home;