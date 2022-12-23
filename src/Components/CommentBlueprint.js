import  {MuiAccordion}  from "./MUIAccordion.js";
import React from 'react';


export const CommentSchema = ({arrayWithPosts}) => {

    return(
        arrayWithPosts.map((post) => {
          console.log(post);
          if (post.commentsInPost === 0 ||
            post.commentsInPost === undefined)
            return ( 
              <MuiAccordion header={"Comments"} content="No comments yet" />  
            );
            else 
            return (
              <MuiAccordion
              header={"Comments"}
              content={post.commentsInPost.body}
              creatorAvatar={post.thumbnailUrl}
              creatorName={post.commentsInPost.name}
            />
            )
        })
        )

}