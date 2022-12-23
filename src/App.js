import React, { useState, useEffect } from "react";
import {  Button, Modal} from "@mui/material";
import  {MuiAccordion}  from "./Components/MUIAccordion.js";
import {PostFields} from "./Components/CreatePost.js";
import { EditPostFields } from "./Components/editPost.js";
import { PostSchema } from "./Components/PostBlueprint.js";

import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [mappedPosts, setMappedPosts] = useState([]);
  const [idForEditing, setID] = useState([]);
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
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
  const removeElement = (_id) => {
    const newPosts = mappedPosts.filter((mappedPosts) => mappedPosts._id !== _id);
   //Backend fetch
   const deleteResource = (id) => {
    fetch(`http://localhost:5000/api/products/${id}`,{
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error(error))
    };
   deleteResource(_id)

    setMappedPosts(newPosts); 
  }

  //Modal open
  const handleModalToggle = () => {
    setOpen(!open);
  };
  // Modal changes
  const handleEditableModalToggle = () => setEditOpen(!editOpen);

  //Search for a post by ID via the button
  const checkId = (event) => {
    setID(event.currentTarget.id);
    console.log(event.currentTarget.id);
    handleEditableModalToggle();
  };
  //Сhanging a post with a specific id
  const updatePost = (updatedPost) => {
    setMappedPosts(
      mappedPosts.map((post) =>
        post._id === idForEditing ? updatedPost : post
      )
    );
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
          modalStatusChange={handleModalToggle}
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
        <PostSchema
          arrayWithPosts={mappedPosts}
          checkingId={checkId}
          deleteElement={removeElement}    
        />
   
      )}
    </div>
  );
}
export default App;
