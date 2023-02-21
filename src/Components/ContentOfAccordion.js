import { AccordionDetails, Typography, Avatar, IconButton } from "@mui/material";
import { Divider } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import React from "react";

export const InsideAccordion = ({ arrayForMapping, setMappedComments }) => {

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

  //editing

  if  (!Array.isArray(arrayForMapping) || !arrayForMapping.length)
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
          </span>
          {/* <IconButton
                aria-label="Edit"
                disableRipple
                id={post._id}
                onClick={checkingId}
              >
                <EditIcon />
              </IconButton> */}


          <Typography> {commentStuff.body}</Typography>
          <Divider sx={{ border: 1 }} />
        </AccordionDetails>
      );
  });
};
