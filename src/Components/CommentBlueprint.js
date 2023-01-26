import { MuiAccordion } from "./MUIAccordion.js";
import { CommentFields } from "./commentEditor";
import React from "react";

export const CommentSchema = ({ wholePost }) => {
  if (wholePost.length === 0 || wholePost === [] )
    return (
    <CommentFields  /> 
    );  
  else
  console.log(wholePost)

      return (   
      <MuiAccordion
       arrayForComments={wholePost}
      />
      );     
 

};
