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
import React, { useContext } from "react";
import {postContext} from "./PostBlueprint"
import {userContext} from "../App.js"




export const MuiAccordion = ({ MuiAddingComments,arrayForComments }) => {
  const postId = useContext(postContext);
  const username = useContext(userContext);
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
      <CommentFields _id={postId} userName={username} addingToArray={MuiAddingComments}/>
      <InsideAccordion arrayForMapping={arrayForComments} />
    </Accordion>
  );
};
