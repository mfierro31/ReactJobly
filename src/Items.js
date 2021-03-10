import React, { useState, useEffect } from "react";
import SearchForm from "./SearchForm";
import JoblyApi from "./api";
import "./Items.css";

const Items = ({ items }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [companiesOrJobs, setCompaniesOrJobs] = useState([]);

  useEffect(() => {
    async function getItems() {
      const compsOrJobs = (items === "companies") ? await JoblyApi.getCompanies() : await JoblyApi.getJobs();
      setCompaniesOrJobs(compsOrJobs);
      setIsLoading(false);
    }
    getItems();
  }, []);

  const filterItems = async query => {
    const compsOrJobs = (items === "companies") ? await JoblyApi.getCompanies(query) : await JoblyApi.getJobs(query);
    setCompaniesOrJobs(compsOrJobs);
  };

  if (isLoading) {
    return (
      <div className="Items-loading">
        <h1 className="text-danger">Loading...</h1>
      </div>
    );
  } else {
    return (
      <div className="Items">
        <div className="Items-container">
          <SearchForm filter={filterItems} />
          {companiesOrJobs.length === 0 ? <p className="text-left lead">Sorry, no results found!</p> : null}
          {companiesOrJobs.map(cOrJ => (
            <div>
              {items === "companies" ? 
              <>
                <p>{cOrJ.name}</p>
                <p>{cOrJ.description}</p>
              </> :
              <>
                <p>{cOrJ.title}</p>
                <p>{cOrJ.companyName}</p>
                <p>Salary: {cOrJ.salary}</p>
                <p>Equity: {cOrJ.equity}</p>
              </>
              }
            </div>
          ))}
        </div>
      </div>
    );
  }
};

export default Items;