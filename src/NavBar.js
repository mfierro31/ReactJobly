import React from "react";
import "./NavBar.css";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, NavItem } from "reactstrap";

function NavBar({ currUser, logout }) {
  return (
    <div className="NavBar">
      <Navbar expand="md">
        <NavLink to="/" className="navbar-brand">
          Jobly
        </NavLink>

        <Nav className="ml-auto" navbar>
          {currUser ? 
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
                {/* /logout doesn't exist, so instead of going to /logout, we will get redirected to the Home page */}
                <NavLink onClick={logout} to="/logout">Log out {currUser.username}</NavLink>
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