import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Posts = () => {
  const navigate = useNavigate();
  const currentDate = new Date().toDateString();

  const [title, setTitle] = useState("");
  const [posts, setPosts] = useState("");
  const [content, setContent] = useState("");
  const [blogTitle, setBlogTitle] = useState("");
  const [time, setTime] = useState("");
  const [dbContent, setDbContent] = useState([]); // Initialize as an empty array
  const [user,SetUser] =useState("")
  const [isLoading, setIsLoading] = useState(true);

  function handlePostChange(event) {
    setPosts(event.target.value);
  }

  function handleTitleChange(event) {
    setTitle(event.target.value);
  }

  async function submitContent() {
    setContent(posts);
    setPosts("");
    setTime(currentDate);
    setBlogTitle(title);
    setTitle("");
    try {
      const data = { title, posts };
      const response = await fetch("http://localhost:5000/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Access-Control-Allow-Credentials": "true"
        },
        body: JSON.stringify(data),
        credentials: "include"
      });
      
      if (!response.ok) {
        console.log("Error adding data to DB");
      }
      if(response.ok){
        const mydata = await response.json()
        setDbContent(mydata || [])
      }
    } catch (error) {
      console.log("Error adding data to DB: ", error);
    }
  }

  const sessionLogout = async () => {
    try {
      const response = await fetch("http://localhost:5000/logout", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      });
      if (response.ok) {
        navigate("/");
      } else {
        const error = await response.json();
        console.log("ERROR Logging Out:", error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const isUserAuthenticated = async () => {
    try {
      const response = await fetch("http://localhost:5000/posts", {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include" // Ensure credentials are included
      });
      if (response.status !== 200) {
        navigate("/");
      } else {
        const mydata = await response.json();
        console.log("Backend to frontend", mydata);
        setDbContent(mydata || []); // Ensure the data is an array
        setIsLoading(false);
      }
    } catch (error) {
      console.log("ERROR Authenticating requests: ", error);
      navigate("/"); // Navigate to login on error
    }
  };

  async function deletePost(postId) {
    try {
      console.log(`Attempting to delete post with id: ${postId}`);
      const response = await fetch(`http://localhost:5000/delete/${postId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (response.ok) {
        console.log("Post deleted successfully");
        // Update the local state to reflect the deleted post
        setDbContent(dbContent.filter(post => post.id !== postId));
        navigate("/posts");
      } else {
        console.error("Failed to delete post");
      }
    } catch (error) {
      console.log("Error deleting blog post: ", error);
    }
  }


  useEffect(() => {
    isUserAuthenticated();
  }, []);

  if (isLoading) {
    return (
      <div id="loading">
        <h2>Loading....</h2>
        <img src="./Spinner.svg" alt="Loading animation" />
      </div>
    );
  }

  return (
    <div className="accountpage">
      <h2>$Users Blog</h2>
      <button id="logout" onClick={sessionLogout}>Logout</button>
      <div className="postinput">
        <label>Blog</label>
        <label>Title:</label>
        <input type="text" value={title} onChange={handleTitleChange} name="title" />
        <label htmlFor="">Content:</label>
        <input type="text" value={posts} onChange={handlePostChange} name="posts" />
        <button onClick={submitContent}>Add</button>
      </div>
      {/* <div className="posts">
        <div><h3>Your Blog Posts:</h3></div>
        <h2>{blogTitle}</h2>
        <p>{content}</p>
        <p>Author: $User </p>
        <button>Delete</button>
        <p>{time}</p>
      </div> */}
      <div id="serverdata">
      <h1>Below is db data:</h1>
      {dbContent.map((post, index) => (
        <div key={index} id="dbdata">
          <h2>{post.blog_title}</h2>
          <h3>The id is {post.id}</h3>
          <p>{post.blog_content}</p>
          <button onClick={() =>deletePost(post.id)}>Delete</button>
        </div>
      ))}
      </div>
    </div>
    
  );
};

export default Posts;
