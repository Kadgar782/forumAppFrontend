import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Divider,
  Avatar,
} from "@mui/material";
import { InsideAccordion } from "./ContentOfAccordion";
import { CommentFields } from "./commentEditor";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React from "react";

export const MuiAccordion = ({
  arrayForComments
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
      <CommentFields/>
      <InsideAccordion arrayForMapping={arrayForComments}/>
    </Accordion>
  );
};
