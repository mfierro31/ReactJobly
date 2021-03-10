import React, { useState, useEffect } from "react";
import Home from "./Home";
import Items from "./Items";
import Company from "./Company";
import Jobs from "./Jobs";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import ProfileForm from "./ProfileForm";
import { Route, Switch, Redirect } from "react-router-dom";

const Routes = ({ loggedIn, currUser }) => {
  return (    
    <Switch>
      <Route exact path="/">
        <Home loggedIn={loggedIn} currUser={currUser} />
      </Route>
      <Route exact path="/companies">
        <Items items="companies" />
      </Route>
      <Route exact path="/companies/:handle">
        <Company />
      </Route>
      <Route path="/jobs">
        <Items items="jobs" />
      </Route>
      <Route exact path="/login">
        <LoginForm />
      </Route>
      <Route path="/signup">
        <SignupForm />
      </Route>
      <Route exact path="/profile">
        <ProfileForm />
      </Route>
      <Redirect to="/" />
    </Switch>        
  );
};

export default Routes;