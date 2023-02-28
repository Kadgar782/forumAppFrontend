import { MuiAccordion } from "./MUIAccordion.js";
import { CommentFields } from "./commentEditor";
import React, { useContext } from "react";
import {postContext} from "./PostBlueprint"
import {userContext} from "../App.js"

export const CommentSchema = ({ loggedInUser, addingComments, arrayWithComments, setMappedComments, updateComment, }) => {
  const postId = useContext(postContext);
const username = useContext(userContext);
  
  // We only return post if it has no comments and is watched by an unauthorized person

  if (
    (!arrayWithComments?.length || arrayWithComments === undefined) &&
    loggedInUser === ""
  )
    return "";

  //If user is logged in, but post has no comments, we return field for entering comments
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
  // Otherwise, we return accordion with comments and a field for entering comments
  else
    return (
      <MuiAccordion
        updateComment={updateComment}
        userIsLogged={loggedInUser}
        arrayForComments={arrayWithComments}
        setMappedComments={setMappedComments}
        MuiAddingComments={addingComments}
      />
    );     
 

};
