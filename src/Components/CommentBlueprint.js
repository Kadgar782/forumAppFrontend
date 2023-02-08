import { MuiAccordion } from "./MUIAccordion.js";
import { MuiAccordionWithoutCommentField } from "./accordionWithoutCommentField.js";
import { CommentFields } from "./commentEditor";
import React, { useContext } from "react";
import {postContext} from "./PostBlueprint"
import {userContext} from "../App.js"

export const CommentSchema = ({ loggedInUser,addingComments,arrayWithComments }) => {
  const postId = useContext(postContext);
const username = useContext(userContext);
  


  if (
    (!arrayWithComments?.length || arrayWithComments === undefined) &&
    loggedInUser === ""
  )
    return "";
  else if (
    (!arrayWithComments?.length || arrayWithComments === undefined) &&
    loggedInUser !== ""
  )
    return (
      <CommentFields
        _id={postId}
        userName={username}
        addingToArray={addingComments}
      />
    );
  else if (loggedInUser === "")
  return (
    <MuiAccordionWithoutCommentField
    arrayForComments={arrayWithComments}
    />
  )
  else
    return (
      <MuiAccordion
        arrayForComments={arrayWithComments}
        MuiAddingComments={addingComments}
      />
    );     
 

};
