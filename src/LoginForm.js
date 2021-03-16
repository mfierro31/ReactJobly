import React, { useState, useContext } from "react";
import LoggedInContext from "./loggedInContext";
import { useHistory } from "react-router-dom";
import "./LoginForm.css";

const LoginForm = () => {
  const { loginOrSignup } = useContext(LoggedInContext);
  
  const history = useHistory();

  const INITIAL_STATE = {
    username: "",
    password: "",
    error: ""
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
    delete data.error;

    const res = await loginOrSignup(data);

    // if res returns an array, this means we got some sort of error, so we'll set the errors property in formData to be this
    // array, so it will trigger our alert to show
    if (Array.isArray(res)) {
      setFormData(fData => ({ ...fData, error: res[0] }));
    } else {
      history.push("/companies");
    }
  };

  return (
    <div className="LoginForm mt-5">
      <div className="LoginForm-container">
        <h3 className="text-left mb-3">Log In</h3>
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
              {/* the error message, if any */}
              {formData.error ? <div className="alert alert-danger">{formData.error}</div> : null}
              <button className="btn btn-primary float-right">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;