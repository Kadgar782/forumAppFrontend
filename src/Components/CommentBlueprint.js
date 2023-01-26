import { MuiAccordion } from "./MUIAccordion.js";
import React from "react";

export const CommentSchema = ({ wholePost }) => {
  if (wholePost.commentsInPost === 0 || wholePost.commentsInPost === undefined || wholePost.commentsInPost === null )
    return (
    <MuiAccordion header={"Comments"} content="No comments yet" /> 
    );  
  else
  console.log(wholePost)
    return wholePost.map((post)=>{
      return (   
      <MuiAccordion
        header={"Comments"}
        content={post.commentsInPost.body}
        creatorAvatar={post.thumbnailUrl}
        creatorName={post.commentsInPost.name}
      />
      );     
    });

};
