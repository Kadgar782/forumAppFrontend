import { MuiAccordion } from "./MUIAccordion.js";
import { CommentFields } from "./commentEditor";
import React, { useContext } from "react";
import {postContext} from "./PostBlueprint"
import {userContext} from "../App.js"

export const CommentSchema = ({ arrayWithComments }) => {
  const postId = useContext(postContext);
const username = useContext(userContext);


  if (arrayWithComments.length === 0 || arrayWithComments === undefined )
    return (
    <CommentFields _id={postId}
    userName={username} 
    /> 
    );  
  else

      return (   
      <MuiAccordion 
       arrayForComments={arrayWithComments}
      />
      );     
 

};
