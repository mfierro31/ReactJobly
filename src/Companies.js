import React, { useState, useEffect } from "react";
import SearchForm from "./SearchForm";
import CompanyCard from "./CompanyCard";
import JoblyApi from "./api";
import "./Companies.css";

const Companies = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    async function getCompanies() {
      const companies = await JoblyApi.getCompanies();
      setCompanies(companies);
      setIsLoading(false);
    }
    getCompanies();
  }, []);

  const filterCompanies = async query => {
    const companies = await JoblyApi.getCompanies(query);
    setCompanies(companies);
  };

  if (isLoading) {
    return (
      <div className="Companies-loading">
        <h1 className="text-danger">Loading...</h1>
      </div>
    );
  } else {
    return (
      <div className="Companies">
        <div className="Companies-container">
          <SearchForm filter={filterCompanies} />
          {companies.length === 0 ? <p className="text-left lead">Sorry, no results found!</p> : null}
          {companies.map(c => (
            <CompanyCard 
              key={c.handle} 
              handle={c.handle} 
              name={c.name} 
              description={c.description} 
            />
          ))}
        </div>
      </div>
    );
  }
};

export default Companies;