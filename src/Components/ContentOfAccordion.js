import { AccordionDetails, Typography, Avatar } from "@mui/material";
import { Divider } from "@mui/material";
import React from "react";

export const InsideAccordion = ({ arrayForMapping }) => {
  console.log(arrayForMapping);
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
          </span>
          <Typography> {commentStuff.body}</Typography>
          <Divider sx={{ border: 1 }} />
        </AccordionDetails>
      );
  });
};
