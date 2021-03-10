import React from "react";
import "./NavBar.css";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, NavItem } from "reactstrap";

function NavBar({ loggedIn, currUser, changeLoggedInStatus }) {
  return (
    <div>
      <Navbar expand="md">
        <NavLink exact to="/" className="navbar-brand">
          Jobly
        </NavLink>

        <Nav className="ml-auto" navbar>
          {loggedIn ? 
            <>
              <NavItem>
                <NavLink to="/companies">Companies</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/jobs">Jobs</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/profile">Profile</NavLink>
              </NavItem>
              <NavItem className="long-link">
                <NavLink onClick={changeLoggedInStatus} to="/logout">Log out {currUser.username}</NavLink>
              </NavItem>
            </> :
            <>
              <NavItem>
                <NavLink to="/login">Log in</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/signup">Sign up</NavLink>
              </NavItem>
            </>
          }
        </Nav>
      </Navbar>
    </div>
  );
}

export default NavBar;