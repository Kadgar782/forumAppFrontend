import {
  AccordionDetails,
  Typography,
  Avatar,
  IconButton,
  Button,
} from "@mui/material";
import { Divider } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Textarea from "@mui/joy/Textarea";
import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function Comment({
  updateComment,
  setMappedComments,
  arrayWithCommentsForPost,
  commentId,
  commentBody,
  postId,
  loggedInUser,
  postControls,
}) {
  let comment = arrayWithCommentsForPost.find((comment) => comment._id === commentId);

  const [isEditable, setIsEditable] = useState(false);
  const [body, setBody] = useState(comment.body);

  const username = comment.username;
  const thumbnailUrl = "https://via.placeholder.com/150/54176f";
  const _id = commentId
  const updatedComment = { _id, body, thumbnailUrl, postId, username  };

  const notify = () => toast("The comment was successfully deleted");

  


  //editing
  const turnEditMode = () => {
    setIsEditable(!isEditable);
    console.log(isEditable);
  };


  const removeElement = (_id) => {
    //Backend fetch

    fetch(`http://localhost:5000/api/comments/${_id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));

    const newComments = arrayWithCommentsForPost.filter(
      (arrayForMapping) => arrayForMapping._id !== _id
    );
    console.log(arrayWithCommentsForPost)
    console.log(newComments)
    setMappedComments(newComments);
    console.log(arrayWithCommentsForPost)
    notify()
  };

  //Function for button
  const handleSubmit = (_id) => {
    // make request to backend

    fetch(`http://localhost:5000/api/comments/${_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedComment),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.error(error);
      });
    updateComment(updatedComment, _id); //which comment should be changed
    turnEditMode();
  };


  if (postControls === true || username === loggedInUser){
    //Return if user is admin or author of comment
  return (
      <AccordionDetails
      sx={{
        padding: 0,
        backgroundColor: "#cbcccc",
      }}
    >
      <span>
        <Avatar
          alt="Placeholder"
          src={thumbnailUrl}
          variant="rounded"
          sx={{
            maxWidth: 35,
            maxHeight: 35,
            marginRight: 0.5,
          }}
        />
        {username}
  
        <IconButton
          aria-label="delete"
          disableRipple
          onClick={() => removeElement(_id)}
        >
          <DeleteIcon />
        </IconButton>
  
        <IconButton aria-label="Edit" disableRipple id={_id} onClick={()=>turnEditMode()}>
          <EditIcon />
        </IconButton>
      </span>
      {isEditable ? ( //true
        <div style={{ display: "flex", alignItems: "center" }}>
          <Textarea
            size="md"
            className="inputField"
            value={body}
            onChange={(newValue) => setBody(newValue.target.value)}
          >
            {" "}
          </Textarea>
          <Button onClick={() => handleSubmit(_id)}>
            Done
          </Button>
          <Button>Cancel</Button>
        </div>  
      ) : (
        <Typography id={_id}> {commentBody}</Typography>
      )}
  
      <Divider sx={{ border: 1 }} />
      <div>
       <ToastContainer/>
      </div>
    </AccordionDetails>
    
  )
} else {
  //Return if user is not admin or author
  return (
    <AccordionDetails
    sx={{
      padding: 0,
      backgroundColor: "#cbcccc",
    }}
  >
    <span>
      <Avatar
        alt="Placeholder"
        src={thumbnailUrl}
        variant="rounded"
        sx={{
          maxWidth: 35,
          maxHeight: 35,
          marginRight: 0.5,
        }}
      />
      {username}
    </span>
    {isEditable ? ( //true
      <div style={{ display: "flex", alignItems: "center" }}>
        <Textarea
          size="md"
          className="inputField"
          value={body}
          onChange={(newValue) => setBody(newValue.target.value)}
        >
          {" "}
        </Textarea>
        <Button onClick={() => handleSubmit(_id)}>
          Done
        </Button>
        <Button>Cancel</Button>
      </div>  
    ) : (
      <Typography id={_id}> {commentBody}</Typography>
    )}

    <Divider sx={{ border: 1 }} />

  </AccordionDetails>
)
}
}
