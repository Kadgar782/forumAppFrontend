import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Divider,
  Avatar,
} from "@mui/material";
import { CommentFields } from "./commentEditor";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React from "react";

export const MuiAccordion = ({
  header,
  content,
  creatorAvatar,
  creatorName,
}) => {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        sx={{
          backgroundColor: "#cbcccc",
        }}
      >
        <Typography>Comments</Typography>
      </AccordionSummary>
     
      <AccordionDetails
        sx={{
          padding:0,
          backgroundColor: "#cbcccc",
        }}
      >
        <CommentFields />

        <span>
          <Avatar
            alt="Placeholder"
            src={creatorAvatar}
            variant="rounded"
            sx={{
              maxWidth: 35,
              maxHeight: 35,
              marginRight: 0.5,
            }}
          />
          {creatorName}
        </span>
        <Typography> {content}</Typography>
      </AccordionDetails>
    </Accordion>
  );
};
