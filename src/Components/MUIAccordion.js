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
          borderBottom: 1, 
          '&:hover': {
          backgroundColor: '#5be1e1',
          opacity: [0.9, 0.8, 0.7],
        },
          '& .css-7jip21-MuiButtonBase-root-MuiAccordionSummary-root': {  backgroundColor: "#5be1e1",},     
        }}
      >
        <Typography>Comments</Typography>
      </AccordionSummary>
      <CommentFields _id={postId} userName={username} addingToArray={MuiAddingComments}/>
      <InsideAccordion arrayForMapping={arrayForComments} />
    </Accordion>
  );
  
};
