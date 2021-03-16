import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Job from "./Job";
import JoblyApi from "./api";
import { Redirect } from "react-router-dom";
import "./Company.css";

const Company = () => {
  const { handle } = useParams();
  const [company, setCompany] = useState(null);

  useEffect(() => {
    async function getCompany() {
      const res = await JoblyApi.getCompany(handle);
      
      // If res is an array, that means the company handle doesn't exist and we got back an error
      if (Array.isArray(res)) {
        setCompany("not found");
      } else {
        setCompany(res);
      }
    }
    getCompany();
  }, [handle]);

  if (company === null) {
    return (
      <div className="Company-loading">
        <h1 className="text-danger">Loading...</h1>
      </div>
    );
  } else if (company === "not found") {
    return <Redirect to="/companies" />;
  } else {
    return (
      <div className="mt-5 Company">
        <div className="Company-container">
          <h4 className="text-left">{company.name}</h4>
          <p className="text-left">{company.description}</p>
          <div>
            {company.jobs.map(j => <Job key={j.id} id={j.id} title={j.title} equity={j.equity} salary={j.salary} />)}
          </div>
        </div>
      </div>
    );
  }
};

export default Company;