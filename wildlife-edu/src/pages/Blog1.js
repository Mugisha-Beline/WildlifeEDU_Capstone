// Blogs.js
import React, { useState, useEffect } from "react";
import { db, addPost, getPosts } from "./Firebase"; // Import Firebase functions
import "./Blog1.css";

function Blogs() {
    const [username, setUsername] = useState(""); // State for username input
    const [message, setMessage] = useState("");  // State for message input
    const [posts, setPosts] = useState([]);      // State for fetched posts

    // Fetch posts from Firebase on component mount
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const fetchedPosts = await getPosts(); // Fetch posts from Firestore
                setPosts(fetchedPosts);
            } catch (error) {
                console.error("Error fetching posts:", error.message);
            }
        };
        fetchPosts();
    }, []);

    // Handle adding a new post
    const handleAddPost = async () => {
        if (username && message) {
            const newPost = {
                username,
                message,
                timestamp: new Date().toISOString(),
            };
            try {
                await addPost(newPost); // Store post in Firestore
                setPosts((prevPosts) => [newPost, ...prevPosts]); // Update local posts
                setUsername(""); // Clear input fields
                setMessage("");
                alert("Post added successfully!");
            } catch (error) {
                console.error("Error adding post:", error.message);
                alert("Failed to add post. Try again.");
            }
        } else {
            alert("Please enter both username and message.");
        }
    };

    return (
        <div className="blog-container">
            <h1 className="blog-title">Dian Fossey: The Legacy of Conservation</h1>
            <div className="blog-content">
                <p>
                    Dian Fossey was a renowned American primatologist and conservationist best known for her extensive study of mountain gorillas in Rwanda. Her dedication to their protection and her groundbreaking research left an indelible mark on conservation science.
                </p>
                <img src="kwita-izina.jpg" alt="Mountain Gorillas" className="blog-image" />
                <p>
                    Starting in the dense forests of Rwanda in the 1960s, Fossey's work documented the complex social behaviors of mountain gorillas, bringing their plight to global attention. Her life was tragically cut short, but her efforts paved the way for international conservation initiatives.
                </p>
                <p>
                    Dian Fossey’s legacy lives on through organizations like the Dian Fossey Gorilla Fund, ensuring that mountain gorillas continue to thrive. Her story remains an inspiration for anyone passionate about wildlife conservation.
                </p>
            </div>

            {/* Add Post Section */}
            <div className="post-section">
                <h2>Leave a Comment</h2>
                <div className="post-form">
                    <input
                        type="text"
                        placeholder="Your Name"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <textarea
                        placeholder="Your Comment"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    ></textarea>
                    <button onClick={handleAddPost}>Submit</button>
                </div>
            </div>

            {/* Display Posts Section */}
            <div className="posts-list">
                <h2>Comments</h2>
                {posts.map((post, index) => (
                    <div key={index} className="post-item">
                        <strong>{post.username}</strong> - <span>{new Date(post.timestamp).toLocaleString()}</span>
                        <p>{post.message}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Blogs;
