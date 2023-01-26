import { MuiAccordion } from "./MUIAccordion.js";
import React from "react";

export const CommentSchema = ({ wholePost }) => {
  if (wholePost.lenght === 0 || wholePost === [] )
    return (
    <MuiAccordion header={"Comments"} content="No comments yet" /> 
    );  
  else
  console.log(wholePost)
    return wholePost.map((post)=>{
      return (   
      <MuiAccordion
        header={"Comments"}
        content={post.body}
        creatorAvatar={post.thumbnailUrl}
        creatorName={post.name}
      />
      );     
    });

};
