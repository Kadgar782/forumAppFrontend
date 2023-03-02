import { AccordionDetails, Typography, Avatar, IconButton } from "@mui/material";
import React from "react";
import { Comment } from "./Comment";




export const InsideAccordion = ({ arrayForMapping, setMappedComments,updateComment, }) => {



  if (!Array.isArray(arrayForMapping) || !arrayForMapping.length)
    return <AccordionDetails></AccordionDetails>;
  else
    return arrayForMapping.map((commentStuff) => {
      const {username, _id, thumbnailUrl, body} = commentStuff
      return (
        <Comment
          commentId={_id}
          commentBody={body}
          updateComment={updateComment}
          setMappedComments={setMappedComments}
          arrayForMapping={arrayForMapping}
        />
      );
    });
};
