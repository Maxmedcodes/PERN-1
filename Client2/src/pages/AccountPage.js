import { useState } from "react";

const AccountPage = () => {
  const currentDate = new Date().toDateString();

  const [title, SetTitle] = useState();
  const [posts, SetPosts] = useState();
  const [content, SetContent] = useState();
  const [blogtitle, Setblogtitle] = useState();
  const [time, SetTime] = useState();

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
