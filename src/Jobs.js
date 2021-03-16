import React, { useState, useEffect } from "react";
import SearchForm from "./SearchForm";
import Job from "./Job";
import JoblyApi from "./api";
import "./Jobs.css";

const Jobs = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    async function getJobs() {
      const jobs = await JoblyApi.getJobs();
      setJobs(jobs);
      setIsLoading(false);
    }
    getJobs();
  }, []);

  const filterJobs = async query => {
    const jobs = await JoblyApi.getJobs(query);
    setJobs(jobs);
  };

  if (isLoading) {
    return (
      <div className="Jobs-loading">
        <h1 className="text-danger">Loading...</h1>
      </div>
    );
  } else {
    return (
      <div className="Jobs">
        <div className="Jobs-container">
          <SearchForm filter={filterJobs} />
          {jobs.length === 0 ? <p className="text-left lead">Sorry, no results found!</p> : null}
          {jobs.map(j => (
            <Job 
              key={j.id} 
              id={j.id}
              title={j.title} 
              salary={j.salary} 
              equity={j.equity} 
            />
          ))}
        </div>
      </div>
    );
  }
};

export default Jobs;