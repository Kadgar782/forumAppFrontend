import { AccordionDetails, Typography, Avatar, IconButton } from "@mui/material";
import { Divider } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import React, { useState, } from "react";



export const InsideAccordion = ({ arrayForMapping, setMappedComments,updateComment, }) => {
  const [idForEditing, setID] = useState([]);
  const [isEditable, setStatus] = useState(false);

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
    updateComment(updatedComment,commentId);
  }

  //editing
  const turnEditMode = () => {
    setStatus(!isEditable);
    console.log(isEditable)
  };

  const checkId = (event) => {
    setID(event.currentTarget.id);
    console.log(event.currentTarget.id);
    turnEditMode();
  };

  if (!Array.isArray(arrayForMapping) || !arrayForMapping.length)
    return <AccordionDetails></AccordionDetails>;
  else
    return arrayForMapping.map((commentStuff) => {
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
              src={commentStuff.thumbnailUrl}
              variant="rounded"
              sx={{
                maxWidth: 35,
                maxHeight: 35,
                marginRight: 0.5,
              }}
            />
            {commentStuff.username}

            <IconButton
              aria-label="delete"
              disableRipple
              onClick={() => removeElement(commentStuff._id)}
            >
              <DeleteIcon />
            </IconButton>

            <IconButton
              aria-label="Edit"
              disableRipple
              id={commentStuff._id}
              onClick={checkId}
            >
              <EditIcon />
            </IconButton>
          </span>
          {
            isEditable? ( //true
              <Typography id={commentStuff._id}> {commentStuff.body}  + "1"</Typography>
              ) : (
                <Typography id={commentStuff._id} > {commentStuff.body}</Typography>
              )
            }
            
            
 
          <Divider sx={{ border: 1 }} />
        </AccordionDetails>
      );
    });
};
