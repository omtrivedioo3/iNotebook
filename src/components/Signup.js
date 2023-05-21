import React, { useState } from "react";
// import { useHistory } from "react-router-dom";
function Signup(props) {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: " ",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = credentials;
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      // Save the auth token and redirect
      localStorage.setItem("token", json.authtoken);
      //   history.push("/");
      props.showAlert("Account Created Successfully", "success");
    } else {
      props.showAlert("Invalid Credentials", "danger");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <label
            htmlFor="name"
            className="col-sm-2 col-form-label col-form-label-sm"
          >
            Name
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              name="name"
              className="form-control form-control-sm"
              id="name"
              onChange={onChange}
              placeholder="col-form-label-sm"
            />
          </div>
        </div>
        <div className="row mb-3">
          <label
            htmlFor="email"
            className="col-sm-2 col-form-label col-form-label-sm"
          >
            Email
          </label>
          <div className="col-sm-10">
            <input
              type="email"
              className="form-control form-control-sm"
              id="email"
              name="email"
              onChange={onChange}
              placeholder="col-form-label-sm"
            />
          </div>
        </div>
        <div className="row mb-3">
          <label
            htmlFor="password"
            className="col-sm-2 col-form-label col-form-label-sm"
          >
            password
          </label>
          <div className="col-sm-10">
            <input
              type="password"
              name="password"
              className="form-control form-control-sm"
              id="password"
              onChange={onChange}
              placeholder="col-form-label-sm"
              minLength={5}
              required
            />
          </div>
        </div>
        <div className="row mb-3">
          <label
            htmlFor="cpassword"
            className="col-sm-2 col-form-label col-form-label-sm"
          >
            Confirmed password
          </label>
          <div className="col-sm-10">
            <input
              type="cpassword"
              className="form-control form-control-sm"
              id="cpassword"
              name="cpassword"
              onChange={onChange}
              placeholder="col-form-label-sm"
              minLength={5}
              required
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Signup;
