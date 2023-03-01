import { AccordionDetails, Typography, Avatar, IconButton } from "@mui/material";
import { Divider } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import React, { useState, } from "react";


export function Comment({ updateComment, username, _id, thumbnailUrl, body, setMappedComments, arrayForMapping}) {

  const [isEditable, setIsEditable] = useState(false);
  const [idForEditing, setID] = useState([]);

  
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


  const handleSubmit = (updatedComment, commentId) => {
    updateComment(updatedComment,commentId); //скажет какой комент надо обновить
  }
  
  //editing
  const turnEditMode = () => {
    setIsEditable(!isEditable);
    console.log(isEditable)
  };
  
  const checkId = (event) => {
    setID(event.currentTarget.id);
    console.log(event.currentTarget.id);
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

          <IconButton
            aria-label="Edit"
            disableRipple
            id={_id}
            onClick={checkId}
          >
            <EditIcon />
          </IconButton>
        </span>
        {
          isEditable? ( //true
            <Typography id={_id}> {body}  + "1"</Typography>
            ) : (
              <Typography id={_id} > {body}</Typography>
            )
          }
          
          

        <Divider sx={{ border: 1 }} />
      </AccordionDetails>
    );
  }
