import React, { useState } from "react";


import { Link, useNavigate } from "react-router-dom";


const Home = () => {
  const navigate = useNavigate();

  const [email, SetEmail] = useState("")
  const [password, SetPassword] = useState("")
  const [errorlogin, SetErrorLOgin] = useState("")

  function submitEmailchange(event){
    SetEmail(event.target.value)
  }
  function submitPasswordchange(event){
    SetPassword(event.target.value)
  }

  const onsubmitForm = async (event) => {
    event.preventDefault();
  
    try {
      const data = { email, password };
      const url = "http://localhost:5000/login";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Access-Control-Allow-Credentials": "true"
        },
        body: JSON.stringify(data),
        credentials: 'include'
      });
  
      if (response.ok) {
        navigate("/posts");
      } else {
        const error = await response.json();
        SetErrorLOgin(error.message);
      }
    } catch (error) {
      console.error("ERROR Signing In:", error);
      SetErrorLOgin("An unexpected error occurred. Please try again.");
    }
  };
  

  return (
    <div className="form">
      <div className="blog-home-title">
        <h1>Lets Blog </h1>
      </div>
      <div className="blog-home-image">
        <div className="blog-section-1">
          <h3>Welcome to Blogell</h3>
          <img src="/images/Blogell.jpg" alt="blog image"  height={200} width={200}/>
          <p>
            Blogell is A Website that allows you to create an Account in which you can post your blogs and 
            view them. Your account is stored securely on our Postgres server your details are hashed using bcrypt on our backend  <br/> <br/> 
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Placeat eveniet saepe voluptates nulla. Veritatis est, suscipit 
            repudiandae eaque enim odit ullam error accusantium at, sint, quis minus doloribus dicta provident. 
            Corrupti, rerum atque voluptatem sunt quaerat ea dolore. Corrupti ab dolor unde, eveniet cum beatae adipisci molestias nam 
            optio iste!</p>
            <div className="homepage-buttons">
            <Link to={"/signin"} id="login-button">Login </Link>
            <Link to={"/register"} id="register-button">Register</Link>
            </div>
        </div>
        <div className="blog-section-2">
        <h3>Time: Our Eternal Enemy</h3>
        
        <p> <img src="./images/time.png" alt="clock image" height={200} width={200} /> Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit tenetur assumenda in, quibusdam fuga possimus pariatur maxime perspiciatis autem inventore, consequatur dolorem provident perferendis eligendi enim iusto asperiores qui nemo labore impedit, ullam veritatis libero. Officiis nulla quo tempore soluta nam delectus, veniam, voluptate cumque magni ex, distinctio ipsam quidem.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic quae mollitia itaque dolorum reiciendis voluptatem blanditiis
           debitis excepturi nostrum ea perferendis rerum cumque, accusantium molestiae minus odio, animi voluptate. Eos enim veritatis
           ab hic optio aliquam debitis voluptatem tempore dolor blanditiis. Soluta laudantium eius corporis dolores, voluptatum voluptas facilis eos?</p>
      </div>
        <div className="blog-section-2">
        <h3>Football: The Eternal Game</h3>
        
        <p> <img src="./images/footballer.jpeg" alt="footballer" height={200} width={200} /> Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit tenetur assumenda in, quibusdam fuga possimus pariatur maxime perspiciatis autem inventore, consequatur dolorem provident perferendis eligendi enim iusto asperiores qui nemo labore impedit, ullam veritatis libero. Officiis nulla quo tempore soluta nam delectus, veniam, voluptate cumque magni ex, distinctio ipsam quidem.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic quae mollitia itaque dolorum reiciendis voluptatem blanditiis
           debitis excepturi nostrum ea perferendis rerum cumque, accusantium molestiae minus odio, animi voluptate. Eos enim veritatis
           ab hic optio aliquam debitis voluptatem tempore dolor blanditiis. Soluta laudantium eius corporis dolores, voluptatum voluptas facilis eos?</p>
      </div>
      </div>
      
    </div>
  );
};

export default Home;


