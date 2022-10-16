import React, { useState, useEffect } from "react";
import './App.css';


function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [comments, setComments] = useState([]);
  const [users, setUsers] = useState([]);
  const [mappedPosts, setMappedPosts] = useState([]);

  //Getting Post content
  useEffect(() => {
    // declare the async data fetching function
    const fetchData = async (url, setData) => {
      // get the data from the api
      const response = await fetch(url);
      // convert the data to json
      const json = await response.json();
  
      // set state with the result
      setData(json);
    }
  
    // call the function
    
    fetchData("https://jsonplaceholder.typicode.com/posts",setPosts);
    fetchData("https://jsonplaceholder.typicode.com/photos",setPhotos)
    fetchData("https://jsonplaceholder.typicode.com/users",setUsers)
    fetchData("https://jsonplaceholder.typicode.com/comments",setComments)
         // make sure to catch any error
         .catch(console.error);
    setMappedPosts(
          posts.map((p) => {
            const avatars = photos.find((u) => u.id === p.userId); // userId в постах
            //Add Comments
            const commentsInPost = comments.find((u) => u.id === p.userId);
    
            // Changing ID
            const createdBy = users.find((u) => u.id === p.userId);
            return {
              ...p,
              commentsInPost,
              avatars,
              userId: createdBy ? createdBy.username : "Unknown user"
            };
          })
        );
    
        setIsLoading(false);
  }, [])

  const [isActive, setActive] = useState("false");

  const handleToggle = () => {
    setActive(!isActive);
  };

  // Creating Post with JSX
  return (
    <div className="outer">
      {isLoading ? (
        <div>IS loading...</div>
      ) : (
        mappedPosts.map((post) => {
          return (
            <div className="inner" key={post.id}>
              <h1>{post.title}</h1>

              <p>
                {post.body}
                <span>
                  {post.userId}
                  <img className="Avatar" src={post.avatars.thumbnailUrl} />
                </span>
              </p>
              <button
                className={isActive ? "accordion" : "accordion active"}
                onClick={handleToggle}
              >
                Comments
              </button>
              <div className="panel">
                <p>
                  {post.commentsInPost.body}
                  <span>
                    {post.commentsInPost.name}
                    <img className="Avatar" src={post.avatars.thumbnailUrl} />
                  </span>
                </p>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
export default App;


