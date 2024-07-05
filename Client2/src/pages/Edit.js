import { useEffect, useState } from "react";

import { useParams,useNavigate } from "react-router-dom";


const Edit = () => {
    const { id } = useParams();
    const [post, SetPost] = useState({ title: "", content: "", author: "" });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await fetch(`http://localhost:5000/edit/${id}`, {
                    method: 'GET'
                });
                const data = await response.json();
                SetPost({
                    title: data.blog_title,
                    content: data.blog_content,
                    author: data.user_id
                });
            } catch (error) {
                console.log("Error Fetching Specific Post Data ", error);
            }
        };
        fetchPost();
    }, [id]);

    const editPost = async (e) => {
        e.preventDefault(); // Prevent default form submission
        try {
            const response = await fetch(`http://localhost:5000/edit/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(post)
            });
            if (response.ok) {
                navigate("/posts");
            } else {
                console.log("Failed to update post");
            }
        } catch (error) {
            console.log("Error Editing post to DB: ", error);
        }
    };

    return (
        <div className="editblog">
            <form onSubmit={editPost}>
                <h1>Edit Blog Post</h1>
                <input
                    type="text"
                    name="title"
                    id="edit-title"
                    value={post.title}
                    onChange={(e) => SetPost({ ...post, title: e.target.value })}
                />
                <textarea
                    name="content"
                    id="edit-blog"
                    rows="14"
                    cols="50"
                    value={post.content}
                    onChange={(e) => SetPost({ ...post, content: e.target.value })}
                ></textarea>
                <input
                    type="text"
                    id="edit-user"
                    value={post.author}
                    onChange={(e) => SetPost({ ...post, author: e.target.value })}
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default Edit;
