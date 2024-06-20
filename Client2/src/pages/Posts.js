import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const Posts = () => {
  // const data ={email,password};
  // const navigate = useNavigate()
  // useEffect( ()=>{
  //   const checkAuth = async() =>{
  //   try{
  //    const response=   await fetch("http://localhost:5000/posts",{
  //     method:"POST",
  //     credentials: "include",
  //     headers:{"Content-Type":"application/json"},
  //     body:JSON.stringify(data)
  //    })
    
  //    if(response.ok){
  //     navigate("/posts")
  //    } else{
  //     navigate("/")
  //    }
  //   }catch(error){
  //     console.log("Error with crednetials and sessions", error)
  //     navigate("/")
  //   }
  //   } ; checkAuth()
  // }, [navigate])
  const navigate = useNavigate()
  const currentDate = new Date().toDateString();

  const [title, SetTitle] = useState("");
  const [posts, SetPosts] = useState("");
  const [content, SetContent] = useState("");
  const [blogtitle, Setblogtitle] = useState("");
  const [time, SetTime] = useState("");
  const [isLoading, SetIsLoading] = useState(true)

  function handleventchange(event) {
    SetPosts(event.target.value);
  }
  function titleeventchange(event) {
    SetTitle(event.target.value);
  }
  function SubmitContent() {
    SetContent(posts);
    SetPosts("");
    SetTime(currentDate);
    Setblogtitle(title);
    SetTitle("");
  }
  const sessionLogout = async (event)=>{
    try {
      const response = await fetch("http://localhost:5000/logout",{
        method:"GET",
        headers:{
          "Content-Type":"application/json",
        }
      })
      if(response.ok){
        navigate("/")
      }else{
        const error = await response.json()
        console.log("ERROR Logging Out:", error)
      }
    } catch (error) {
      console.log(error)
    }
  }
  const isUserAuthenticated = async () => {
    try {
      const response = await fetch("http://localhost:5000/posts", {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include" // Ensure credentials are included
      });
      if (response.status != 200) {
        navigate("/");
      } else{
        SetIsLoading(false)
      }
    } catch (error) {
      console.log("ERROR Authenticating requests: ", error);
      navigate("/"); // Navigate to login on error
    }
  };
  useEffect(()=>{
    isUserAuthenticated()
  },[])

  if(isLoading){
    return (
      <div id="loading">
        <h2>Loading....</h2>
        <img src="./Spinner.svg" alt="Loading animation"  />
        </div>
    )
  }
  return (
    <div className="accountpage">
      <h2> $Users Blog</h2>
      <button id="logout" onClick={sessionLogout}>Logout</button>
      <div className="postinput">
        <label>Blog</label>
        <label>Title:</label>
        <input type="text" value={title} onChange={titleeventchange} />
        <label htmlFor="">Content:</label>
        <input type="text" value={posts} onChange={handleventchange} />
        <button onClick={SubmitContent}>Add</button>
      </div>
    
      <div className="posts">
        <h3>Your Blog Posts:</h3>
        <h2>{blogtitle}</h2>
        <p>{content}</p>
        <p>Author: $User </p>
        <button>Delete</button>
        <p>{time}</p>
      </div>
    </div>
  );
};

export default Posts;
