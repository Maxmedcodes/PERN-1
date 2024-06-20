import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AccountPage = () => {
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
  const currentDate = new Date().toDateString();

  const [title, SetTitle] = useState("");
  const [posts, SetPosts] = useState("");
  const [content, SetContent] = useState("");
  const [blogtitle, Setblogtitle] = useState("");
  const [time, SetTime] = useState("");

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

  return (
    <div className="accountpage">
      <h2> $Users Blog</h2>
      <button id="logout">Logout</button>
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
        <p>{content}</p>
        <p>Author: $User </p>
        <button>Delete</button>
        <p>{time}</p>
      </div>
    </div>
  );
};

export default AccountPage;
