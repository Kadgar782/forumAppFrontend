import React, { useState, useEffect,} from "react";
import { Divider, Typography,Avatar  } from "@mui/material";
import  {MuiAccordion}  from "./MUIComponents/MUIAccordion.tsx";
import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [comments, setComments] = useState([]);
  const [users, setUsers] = useState([]);
  const [mappedPosts, setMappedPosts] = useState([]);
// Font Sizes
let theme = createTheme();
theme = responsiveFontSizes(theme);
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
    Promise.all([
    fetchData("https://jsonplaceholder.typicode.com/posts",setPosts),
    fetchData("https://jsonplaceholder.typicode.com/photos",setPhotos),
    fetchData("https://jsonplaceholder.typicode.com/users",setUsers),
    fetchData("https://jsonplaceholder.typicode.com/comments",setComments)]).then(()=>{ 
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
    })
          
         setIsLoading(false)
  }, [mappedPosts])

  //Post remove function
  const removeElement = (id) => {
    const newPosts = mappedPosts.filter(
      (mappedPosts) => mappedPosts.id !== id
    );
    setMappedPosts(newPosts);
  };

  // Creating Post with JSX
  return (
    <div className="outer">
      {isLoading ? (
        <div>IS loading...</div>
      ) : (
        mappedPosts.map((post) => {
          return (
              <div className="inner" key={post.id} id={post.id}>
              <Typography variant="h5">{post.title}</Typography>
               <button onClick={()=>removeElement(post.id)}>Remove</button>
              <p>
                {post.body}
                </p>
                <span>
                <Avatar   alt="Placeholder" src={post.avatars.thumbnailUrl} variant="rounded" 
                sx={{
                maxWidth: 35,
                maxHeight: 35,
                marginRight: 0.5
                }}/>
                  {post.userId}
                </span>
              <Divider
              sx={{border: 1}} />
             <MuiAccordion header={"Comments"} 
             content={post.commentsInPost.body} 
             creatorAvatar={post.avatars.thumbnailUrl} 
             creatorName={post.commentsInPost.name}
             />
            </div>
            
          );
        })
      )}
    </div>
  );
}
export default App;


