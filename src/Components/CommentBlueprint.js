import { MuiAccordion } from "./MUIAccordion.js";
import { CommentFields } from "./commentEditor";
import React, { useContext } from "react";
import {postContext} from "./PostBlueprint"
import {userContext} from "../App.js"

export const CommentSchema = ({ wholePost }) => {
  const postId = useContext(postContext);
const username = useContext(userContext);

  if (wholePost.length === 0 || wholePost === [] )
    return (
    <CommentFields _id={postId}
    userName={username} 

    /> 
    );  
  else
  console.log(wholePost)

      return (   
      <MuiAccordion
       arrayForComments={wholePost}
      />
      );     
 

};
