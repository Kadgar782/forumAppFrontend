import { MuiAccordion } from "./MUIAccordion.js";
import React from "react";

export const CommentSchema = ({ wholePost }) => {
  console.log(wholePost);
  if (wholePost.commentsInPost === 0 || wholePost.commentsInPost === undefined)
    return <MuiAccordion header={"Comments"} content="No comments yet" />;
  else
    return (
      <MuiAccordion
        header={"Comments"}
        content={wholePost.commentsInPost.body}
        creatorAvatar={wholePost.thumbnailUrl}
        creatorName={wholePost.commentsInPost.name}
      />
    );
};
