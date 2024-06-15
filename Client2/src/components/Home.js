import React, { useState } from "react";


import { Link, useNavigate } from "react-router-dom";


const Home = () => {
  const navigate = useNavigate();

  const [email, SetEmail] = useState()
  const [password, SetPassword] = useState()
  const [errorlogin, SetErrorLOgin] = useState("")

  function submitEmailchange(event){
    SetEmail(event.target.value)
  }
  function submitPasswordchange(event){
    SetPassword(event.target.value)
  }

   const  onsubmitForm = async (event)=>  {
    event.preventDefault()
     
    try{
      const data ={email,password};
      const url= "http://localhost:5000/login"
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (response.ok){
        const result= await response.json()
        
        navigate("/posts");
      }else{
        const error= await response.json();
        SetErrorLOgin(error.message)
      }
      
    } catch (error) {
      console.error(" ERROR Signing In: ", error);
    }

    
  }

  return (
    <div className="form">
      <form action="/posts" method="post" onSubmit={onsubmitForm}>
        <h2>Sign In</h2>
        <label> Username:</label>
        <input type="email" name="" id="username" value={email} onChange={submitEmailchange}/>
        <label htmlFor=""> Password</label>
        <input type="password" name="" id="password" value={password} onChange={submitPasswordchange}/>
        <p id="ErrorMessage">{errorlogin}</p>
        <button>Sign In</button>
        <button>
          <Link to="/">
            Sign In with Google
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="30"
              height="30"
              viewBox="0 0 48 48"
            >
              <path
                fill="#FFC107"
                d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
              ></path>
              <path
                fill="#FF3D00"
                d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
              ></path>
              <path
                fill="#4CAF50"
                d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
              ></path>
              <path
                fill="#1976D2"
                d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
              ></path>
            </svg>
          </Link>
        </button>
        <p>Don't have an Account?</p>
        <button>
          <Link to="/register">Sign Up</Link>
        </button>
      </form>
    </div>
  );
};

export default Home;
