import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; 
import './Forum.css';
import { auth, addPost, getPosts, updatePost } from './Firebase'; // Import Firebase functions

const Forum = () => {
  const [posts, setPosts] = useState([]); // Initialize with an empty array
  const [newPost, setNewPost] = useState('');
  const [replyContent, setReplyContent] = useState('');
  const [user, setUser] = useState(null); // Store the logged-in user's data

  // Fetch the current user from Firebase
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser({
          displayName: currentUser.displayName || currentUser.email, // Use displayName or email
          email: currentUser.email
        });
      } else {
        setUser(null); // No user is logged in
      }
    });

    return () => unsubscribe(); // Cleanup the subscription on unmount
  }, []);

  // Fetch posts from Firestore when the component mounts
  useEffect(() => {
    const fetchPosts = async () => {
      const fetchedPosts = await getPosts();
      setPosts(fetchedPosts);
    };

    fetchPosts();
  }, []);

  // Handle posting new content
  const handlePostSubmit = async (e) => {
    e.preventDefault();
    if (newPost.trim() && user) {
      const newPostData = {
        username: user.displayName || 'Anonymous',
        content: newPost,
        timestamp: new Date().toISOString(), // Store the timestamp as ISO string
        likes: 0,
        dislikes: 0,
        replies: [],
        userReaction: null // Initialize userReaction for the new post
      };

      // Add the post to Firestore
      await addPost(newPostData);
      setPosts([...posts, newPostData]); // Update local state
      setNewPost(''); // Clear the input
    }
  };

  const toggleReply = (index) => {
    setPosts(posts.map((post, i) => 
      i === index ? { ...post, showReply: !post.showReply } : post
    ));
  };

  const handleReplySubmit = async (postId, e) => {
    e.preventDefault();
    if (replyContent.trim() && user) {
      const updatedPost = posts.map(post => 
        post.id === postId ? {
          ...post,
          replies: [...post.replies, { username: user.displayName || 'Anonymous', content: replyContent, timestamp: new Date().toISOString() }],
          showReply: false // Hide reply textarea after submitting
        } : post
      );

      // Update post in Firestore
      await updatePost(postId, { replies: updatedPost.find(p => p.id === postId).replies });

      setPosts(updatedPost); // Update local state
      setReplyContent(''); // Clear reply content
    }
  };

  const handleLike = async (index) => {
    const post = posts[index];
    
    // Prevent liking/disliking multiple times
    if (post.userReaction === 'like') {
      return; // Do nothing if already liked
    }

    const updatedPosts = posts.map((post, i) => 
      i === index 
        ? { 
            ...post, 
            likes: post.userReaction === 'dislike' ? post.likes + 1 : post.likes + 1, // Adjust likes
            dislikes: post.userReaction === 'dislike' ? post.dislikes - 1 : post.dislikes, // Adjust dislikes
            userReaction: 'like' 
          } 
        : { ...post, userReaction: post.userReaction === 'like' ? null : post.userReaction }
    );

    setPosts(updatedPosts);
    await updatePost(post.id, {
      likes: updatedPosts[index].likes,
      dislikes: updatedPosts[index].dislikes,
      userReaction: updatedPosts[index].userReaction,
    });
  };

  const handleDislike = async (index) => {
    const post = posts[index];

    // Prevent liking/disliking multiple times
    if (post.userReaction === 'dislike') {
      return; // Do nothing if already disliked
    }

    const updatedPosts = posts.map((post, i) => 
      i === index 
        ? { 
            ...post, 
            dislikes: post.userReaction === 'like' ? post.dislikes + 1 : post.dislikes + 1, // Adjust dislikes
            likes: post.userReaction === 'like' ? post.likes - 1 : post.likes, // Adjust likes
            userReaction: 'dislike' 
          } 
        : { ...post, userReaction: post.userReaction === 'dislike' ? null : post.userReaction }
    );

    setPosts(updatedPosts);
    await updatePost(post.id, {
      likes: updatedPosts[index].likes,
      dislikes: updatedPosts[index].dislikes,
      userReaction: updatedPosts[index].userReaction,
    });
  };

  return (
    <div className="forum">
      <div className="forum-header">
        <img src="/profile.jpg" alt="Profile" className="header-image"/>
        <blockquote className="quote">“To conserve should be the nature of human being from his childhood up to adulthood.” — John Williams</blockquote>
        <h3 className="header-discuss">Let's Discuss!</h3>
      </div>

      <div className="forum-posts">
        {posts.map((post, index) => (
          <div key={index} className={`post ${index % 2 === 0 ? 'post-left' : 'post-right'}`}>
            <div className="post-content">
              <div className="post-bubble">
                <div className="post-info">
                  <strong>{post.username}</strong> <span className="timestamp">{new Date(post.timestamp).toLocaleString()}</span>
                </div>
                <p style={{ color: 'black' }}>{post.content}</p> {/* Post content in black */}
                {/* Like and Dislike Buttons with spacing */}
                <div className="like-dislike">
                  <button onClick={() => handleLike(index)}>👍 {post.likes}</button>
                  <button onClick={() => handleDislike(index)}>👎 {post.dislikes}</button>
                  {/* Reply Button */}
                  <button onClick={() => toggleReply(index)}>Reply</button>
                </div>
                {/* Reply Textarea */}
                {post.showReply && (
                  <form onSubmit={(e) => handleReplySubmit(post.id, e)}>
                    <textarea
                      value={replyContent}
                      onChange={(e) => setReplyContent(e.target.value)}
                      placeholder="Write your reply here..."
                      rows="3"
                      required
                    ></textarea>
                    <button type="submit" className="submit-reply-button">Reply</button>
                  </form>
                )}
                {/* Display Replies */}
                {post.replies.length > 0 && (
                  <div className="replies">
                    {post.replies.map((reply, i) => (
                      <div key={i} className="reply" style={{ color: 'black' }}>
                        <strong>{reply.username}</strong>: {reply.content} {/* Reply content in black */}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="post-form">
        <form onSubmit={handlePostSubmit}>
          <textarea
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="Write your post here..."
            rows="4"
            required
          ></textarea>
          <button type="submit" className="submit-post-button">Post</button>
        </form>
      </div>
    </div>
  );
};

export default Forum;
