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

export function Comment({
  updateComment,
  setMappedComments,
  arrayForMapping,
  commentId,
  commentBody,
}) {


  
  let comment = arrayForMapping.find((comment) => comment._id === commentId);

  const [isEditable, setIsEditable] = useState(false);
  const [body, setBody] = useState(comment.body);

  const username = comment.username;
  const thumbnailUrl = comment.thumbnailUrl;
  const _id = commentId
  console.log(_id)


  const updatedComment = { id: _id, body, thumbnailUrl };

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

    const newComments = arrayForMapping.filter(
      (arrayForMapping) => arrayForMapping._id !== _id
    );
    setMappedComments(newComments);
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

    updateComment(updatedComment, _id); //скажет какой комент надо обновить
    turnEditMode();
  };

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
    </AccordionDetails>
  );
}
