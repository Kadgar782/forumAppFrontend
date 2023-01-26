import { MuiAccordion } from "./MUIAccordion.js";
import React from "react";

export const CommentSchema = ({ wholePost }) => {
  if (wholePost.length === 0 || wholePost === [] )
    return (
    <MuiAccordion content="No comments yet" /> 
    );  
  else
  console.log(wholePost)
    return wholePost.map((post)=>{
      return (   
      <MuiAccordion
        content={post.body}
        creatorAvatar={post.thumbnailUrl}
        creatorName={post.name}
      />
      );     
    });

};
