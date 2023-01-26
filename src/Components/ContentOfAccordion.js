import { AccordionDetails, Typography, Avatar } from "@mui/material";
import { CommentFields } from "./commentEditor";
import React from "react";

export const InsideAccordion = ({ arrayForMapping }) => {
  console.log(arrayForMapping);
  return arrayForMapping.map((commentStuff) => {
    if (arrayForMapping === undefined)
      return <AccordionDetails></AccordionDetails>;
    else
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
          </span>
          <Typography> {commentStuff.body}</Typography>
        </AccordionDetails>
      );
  });
};
