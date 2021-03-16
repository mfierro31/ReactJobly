import React, { useContext } from "react";
import LoggedInContext from "./loggedInContext";
import "./Job.css";
import { numberWithCommas as commas } from "./helpers";

const Job = ({ id, title, equity, salary }) => {
  const { apply, currUser } = useContext(LoggedInContext);

  return (
    <div className="Job card mb-5">
      <div className="card-body">
        <h6 className="card-title text-left">{title}</h6>
        <p className="text-left"><small>Salary: {salary ? commas(salary) : null}</small></p>
        <p className="text-left"><small>Equity: {equity}</small></p>
        <button 
          className="btn btn-danger font-weight-bold float-right" 
          onClick={async () => await apply(currUser.username, id)}
          disabled={currUser.applications.includes(id)}
        >APPLY</button>
      </div>
    </div>
  );
};

export default Job;