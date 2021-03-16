import React, { useState, useContext } from "react";
import LoggedInContext from "./loggedInContext";
import { useHistory } from "react-router-dom";
import "./SignupForm.css";

const SignupForm = () => {
  const { loginOrSignup } = useContext(LoggedInContext);
  
  const history = useHistory();

  const INITIAL_STATE = {
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
    errors: []
  };

  const [formData, setFormData] = useState(INITIAL_STATE);

  const handleChange = evt => {
    const { name, value } = evt.target;
    setFormData(fData => ({ ...fData, [name]: value }));
  };

  const handleSubmit = async evt => {
    evt.preventDefault();

    // we're going to copy formData into a new object so we can delete the errors property, otherwise the login function will
    // throw a bad request error at us
    const data = { ...formData };
    delete data.errors;

    const res = await loginOrSignup(data);

    // if res returns an array, this means we got some sort of error, so we'll set the errors property in formData to be this
    // array, so it will trigger our alert to show
    if (Array.isArray(res)) {
      setFormData(fData => ({ ...fData, errors: res }));
    } else {
      history.push("/companies");
    }
  };

  return (
    <div className="SignupForm mt-5">
      <div className="SignupForm-container">
        <h3 className="text-left mb-3">Sign Up</h3>
        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="text-left font-weight-bold">Username</label>
                <input 
                  className="form-control" 
                  name="username" 
                  value={formData.username} 
                  onChange={handleChange} 
                  type="text" 
                  required 
                />
              </div>
              <div className="form-group">
                <label className="text-left font-weight-bold">Password</label>
                <input 
                  className="form-control" 
                  name="password" 
                  value={formData.password} 
                  onChange={handleChange} 
                  type="password" 
                  required 
                />
              </div>
              <div className="form-group">
                <label className="text-left font-weight-bold">First name</label>
                <input 
                  className="form-control" 
                  name="firstName" 
                  value={formData.firstName} 
                  onChange={handleChange} 
                  type="text" 
                  required 
                />
              </div>
              <div className="form-group">
                <label className="text-left font-weight-bold">Last name</label>
                <input 
                  className="form-control" 
                  name="lastName" 
                  value={formData.lastName} 
                  onChange={handleChange} 
                  type="text" 
                  required 
                />
              </div>
              <div className="form-group">
                <label className="text-left font-weight-bold">Email</label>
                <input 
                  className="form-control" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  type="email" 
                  required 
                />
              </div>
              {/* the error message, if any */}
              {formData.errors.length > 0 ? 
                formData.errors.map((e, i) => (
                  <div key={i} className="alert alert-danger">{e}</div>
                )) : 
                null
              }
              <button className="btn btn-primary float-right">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;