import { AccordionDetails, Typography, Avatar, IconButton } from "@mui/material";
import { Divider } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import React, { useState, } from "react";
import { Comment } from "./Comment";
import EdiText from 'react-editext';



export const InsideAccordion = ({ arrayForMapping, setMappedComments,updateComment, }) => {



  if (!Array.isArray(arrayForMapping) || !arrayForMapping.length)
    return <AccordionDetails></AccordionDetails>;
  else
    return arrayForMapping.map((commentStuff) => {
      const {username, _id, thumbnailUrl, body} = commentStuff
      return (
        <Comment
          username={username}
          _id={_id}
          thumbnailUrl={thumbnailUrl}
          body={body}
          updateComment={updateComment}
          setMappedComments={setMappedComments}
          arrayForMapping={arrayForMapping}
        />
      );
    });
};
