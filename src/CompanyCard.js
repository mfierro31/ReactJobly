import React from "react";
import { NavLink } from "react-router-dom";
import "./CompanyCard.css";

const CompanyCard = ({ handle, name, description }) => {
  return (
    <NavLink to={`/companies/${handle}`} className="card mb-3 CompanyCard">
      <div className="card-body">
        <h6 className="card-title text-left">{name}</h6>
        <p className="text-left"><small>{description}</small></p>
      </div>
    </NavLink>
  );
};

export default CompanyCard;