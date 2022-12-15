import React, { useState, useEffect } from "react";
import { Divider, Typography,Avatar,IconButton, Button,Modal} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import  {MuiAccordion}  from "./MUIComponents/MUIAccordion.tsx";
import {PostFields} from "./MUIComponents/CreatePost.tsx";
import { EditPostFields } from "./MUIComponents/editPost.tsx";

import './App.css';


function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [mappedPosts, setMappedPosts] = useState([]);
  const [idForEditing, setID] = useState(0);
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [lastID, setLastID] = useState(100);
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
    const getPosts = async () => {
      const res = await fetchData("http://localhost:5000/api/data");

      const post = res.data;

      setMappedPosts(post);
    };
    getPosts().then(() => setIsLoading(false));
  }, []);
  console.log(mappedPosts);
  //Post remove function
  const removeElement = (id) => {
    const newPosts = mappedPosts.filter((mappedPosts) => mappedPosts.id !== id);
    setMappedPosts(newPosts);
  };

  //Modal open
  const handleModalToggle = () => {
    addingOne();
    setOpen(!open);
  };
  // Modal changes
  const handleEditableModalToggle = () => setEditOpen(!editOpen);

  //Search for a post by ID via the button
  const checkId = (event) => {
    setID(event.currentTarget.id);
    handleEditableModalToggle();
  };
  //Сhanging a post with a specific id
  const updatePost = (updatedPost) => {
    setMappedPosts(
      mappedPosts.map((post) =>
        post.id === Number(idForEditing) ? updatedPost : post
      )
    );
  };
  //Addint 1 to last ID
  const addingOne = () => {
    setLastID(lastID + 1);
  };
  //Adding new data from a component
  const addingToArray = (added) => {
    mappedPosts.unshift(added);
  };

  // Creating Post with JSX
  return (
    <div className="outer">
      <Button onClick={handleModalToggle}>Create new post</Button>
      <Modal open={open} onClose={handleModalToggle}>
        <PostFields
          lastID={lastID}
          modalStatusChange={handleModalToggle}
          mappedPosts={mappedPosts}
          addingToArray={addingToArray}
        />
      </Modal>

      <Modal open={editOpen} onClose={handleEditableModalToggle}>
        <EditPostFields
          modalStatusChange={handleEditableModalToggle}
          specificId={idForEditing}
          allPosts={mappedPosts}
          updatePost={updatePost}
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
                  aria-label="Edit"
                  disableRipple
                  id={post.id}
                  onClick={checkId}
                >
                  <EditIcon />
                </IconButton>

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
              {post.commentsInPost === 0 ||
              post.commentsInPost === undefined ? (
                <MuiAccordion header={"Comments"} content="No comments yet" />
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
