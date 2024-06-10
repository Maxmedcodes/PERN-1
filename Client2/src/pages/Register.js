import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [email, SetEmail] = useState();
  const [password, SetPassword] = useState();
  const navigate = useNavigate();

  function emailchange(event) {
    SetEmail(event.target.value);
  }
  function passwordchange(event) {
    SetPassword(event.target.value);
  }

  const onSubmitForm = async (e) => {
    e.preventDefault();

    try {
      const data = { email, password };
      const url = "http://localhost:5000/register";
      console.log("Making fetch request to:", url);
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      console.log(response);
      navigate("/");
    } catch (error) {
      console.error("THE ERROR: ", error);
    }
  };
  return (
    <div className="register">
      <form action="/register" method="post" onSubmit={onSubmitForm}>
        <h2> Register</h2>
        <label htmlFor="">Email:</label>
        <input
          type="email"
          name=""
          id="email"
          value={email}
          onChange={emailchange}
        />
        <label htmlFor="">Password</label>
        <input
          type="password"
          name=""
          id="password"
          value={password}
          onChange={passwordchange}
        />
        <button>Register</button>
      </form>
    </div>
  );
};

export default Register;
