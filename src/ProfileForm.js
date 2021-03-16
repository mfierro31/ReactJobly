import React, { useState, useContext } from "react";
import LoggedInContext from "./loggedInContext";
import "./ProfileForm.css";

const ProfileForm = () => {
  const { currUser, update } = useContext(LoggedInContext);
  
  const INITIAL_STATE = {
    username: currUser.username,
    password: "",
    firstName: currUser.firstName,
    lastName: currUser.lastName,
    email: currUser.email,
    errors: []
  };

  const [formData, setFormData] = useState(INITIAL_STATE);
  // state to trigger our success alert
  const [saved, setSaved] = useState(false);

  const handleChange = evt => {
    const { name, value } = evt.target;
    setFormData(fData => ({ ...fData, [name]: value }));
  };

  const handleSubmit = async evt => {
    evt.preventDefault();

    const res = await update(formData);

    // if res returns an array, this means we got some sort of error, so we'll set the errors property in formData to be this
    // array, so it will trigger our alert to show
    if (Array.isArray(res)) {
      setSaved(false);
      setFormData(fData => ({ ...fData, errors: res }));
    } else {
      setFormData(fData => ({ ...fData, password: "", errors: [] }));
      setSaved(true);
    }
  };

  return (
    <div className="ProfileForm my-5">
      <div className="ProfileForm-container">
        {saved && <div className="alert alert-success">Successfully saved changes!</div>}
        <h3 className="text-left mb-3">Profile</h3>
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
                  disabled
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
              <div className="form-group">
                <div className="form-text mb-3">Please confirm your password to make changes to your profile.</div>
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
              {formData.errors.length > 0 ? 
                formData.errors.map((e, i) => (
                  <div key={i} className="alert alert-danger">{e}</div>
                )) : 
                null
              }
              <button className="btn btn-primary float-right">Save changes</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;