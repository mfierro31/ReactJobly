import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import Routes from "./Routes";
import LoggedInContext from "./loggedInContext";
import JoblyApi from "./api";
import { decodeJwt } from "./helpers";
import "./Jobly.css";

const Jobly = () => {
  // For currUser and token states, we've saved those in local storage, so we first must look in there for these values on 
  // initial render, if they don't exist in local storage, then we set them to null
  const [currUser, setCurrUser] = useState(() => JSON.parse(window.localStorage.getItem('currUser')) || null);

  const [token, setToken] = useState(() => JSON.parse(window.localStorage.getItem('token')) || null);

  // Every time currUser or token changes, we have to update those values in local storage as well.  This is especially
  // important for token.  If we don't save it to local storage, our JoblyApi class will forget token every time we restart
  // our server.
  useEffect(() => {
    window.localStorage.setItem('currUser', JSON.stringify(currUser));
  }, [currUser]);

  useEffect(() => {
    window.localStorage.setItem('token', JSON.stringify(token));
    JoblyApi.setToken(token);
  }, [token]);

  // logs in a user by setting the token state to what we get back from either the signup or getToken JoblyApi
  // methods and sets the currUser state by decoding the token from signup/getToken, getting the username from it, and using
  // the JoblyApi.getUser method to get the user.

  const loginOrSignup = async data => {
    let res;
    
    // if the data has the key of firstName in it, then we know it's data from the signup form, so we call the signup method
    if (data.firstName) {
      res = await JoblyApi.signup(data);
    } else {
      res = await JoblyApi.getToken(data);
    }

    // if res is an array, that means we got back an error.  we'll return that error so the login/signup form can use it in its 
    // alert
    if (Array.isArray(res)) {
      return res;
    } else {
      // to get the currUser, we have to decode the JWT, get its username property and get the user from that.  it's impossible
      // that we could get back an old JWT of a user who doesn't exist anymore, because if a user doesn't exist, it won't allow 
      // us to log in and get a JWT in the first place.  so we'll use JoblyApi.getUser to get the user and we'll set the currUser
      // state to res2
      const userInfo = decodeJwt(res);
      const res2 = await JoblyApi.getUser(userInfo.username);

      setToken(res);
      setCurrUser(res2);
    }
  };

  // updates a user's profile

  const update = async data => {
    const res = await JoblyApi.update(data);

    if (Array.isArray(res)) {
      return res;
    } else {
      setCurrUser(u => ({
        ...u,
        firstName: res.firstName,
        lastName: res.lastName,
        email: res.email
      }));
    }
  };

  // allows a user to apply for a job

  const apply = async (username, jobId) => {
    await JoblyApi.apply(username, jobId);
    setCurrUser(u => ({ ...u, applications: [...u.applications, jobId] }));
  };

  // logs out a user by clearing the token from the JoblyApi class and setting the currUser and token states to null

  const logout = () => {
    JoblyApi.deleteToken();
    setToken(null);
    setCurrUser(null);
  };
  
  return (
    <div>
      <NavBar currUser={currUser} logout={logout} />
      <main>
        <LoggedInContext.Provider value={{ currUser, loginOrSignup, update, apply, logout }}>
          <Routes currUser={currUser} />
        </LoggedInContext.Provider>
      </main>
    </div>
  );
};

export default Jobly;