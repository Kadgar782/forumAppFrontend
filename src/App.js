import React, { useState, useEffect,} from "react";
import { Divider, Typography,Avatar,IconButton, Button,Modal} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import  {MuiAccordion}  from "./MUIComponents/MUIAccordion.tsx";
import {PostFields} from "./MUIComponents/CreatePost.tsx";

import './App.css';


function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [mappedPosts, setMappedPosts] = useState([]);
  const [open, setOpen] = useState(false);
  //Getting Post content
  useEffect(() => {
    // declare the async data fetching function
    const fetchData = async (url) => {
      // get the data from the api
      const response = await fetch(url);
      // convert the data to json
      const json = await response.json();

      // set state with the result
      return json;
    };
    // call the function
    const mapPosts = async () => {
      const [posts, photos, users, comments] = await Promise.all([
        fetchData("https://jsonplaceholder.typicode.com/posts"),
        fetchData("https://jsonplaceholder.typicode.com/photos"),
        fetchData("https://jsonplaceholder.typicode.com/users"),
        fetchData("https://jsonplaceholder.typicode.com/comments"),
      ]);

      setMappedPosts(
        posts.map((p) => {
          const avatars = photos.find((u) => u.id === p.userId); // userId in posts
          //Add Comments
          const commentsInPost = comments.find((u) => u.id === p.userId);

          // Changing ID
          const createdBy = users.find((u) => u.id === p.userId);
          return {
            ...p,
            commentsInPost,
            avatars,
            userId: createdBy ? createdBy.username : "Unknown user",
          };
        })
      );
    };
    mapPosts().then(() => setIsLoading(false));
  }, []);

  //Post remove function
  const removeElement = (id) => {
    const newPosts = mappedPosts.filter((mappedPosts) => mappedPosts.id !== id);
    setMappedPosts(newPosts);
  };
  //Modal open
  const handleModalToggle = () => setOpen(!open);

  //Adding new data from a component
  const addingToArray = (added) =>
  {
    mappedPosts.unshift(added)
 }
  

  // Creating Post with JSX
  return (
    <div className="outer">
      <Button onClick={handleModalToggle}>Create new post</Button>
      <Modal open={open} onClose={handleModalToggle}>
        <PostFields 
        addingToArray={addingToArray}
        /> 
       
      
      </Modal>
      {isLoading ? (
        <div>IS loading...</div>
      ) : (
        mappedPosts.map((post) => {
          return (
            <div className="inner" key={post.id} id={post.id}>
              <Typography variant="h5">
                {post.title}
                <IconButton
                  aria-label="delete"
                  disableRipple
                  onClick={() => removeElement(post.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </Typography>
              <p>{post.body}</p>
              <span>
                <Avatar
                  alt="Placeholder"
                  src={post.avatars.thumbnailUrl}
                  variant="rounded"
                  sx={{
                    maxWidth: 35,
                    maxHeight: 35,
                    marginRight: 0.5,
                  }}
                />
                {post.userId}
              </span>

              <Divider sx={{ border: 1 }} />
             { post.commentsInPost === 0 || post.commentsInPost === undefined  ? (
                <MuiAccordion
                header={"Comments"} 
                content="No comments yet"
              />
              ) : (
              <MuiAccordion
                header={"Comments"}
                content={post.commentsInPost.body}
                creatorAvatar={post.avatars.thumbnailUrl}
                creatorName={post.commentsInPost.name}
              />
              )}
            </div>
          );
        })
      )}
    </div>
  );
}
export default App;
