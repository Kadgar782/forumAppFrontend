import { MuiAccordion } from "./MUIAccordion.js";
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
  else
    return (
      <MuiAccordion
        userIsLogged={loggedInUser}
        arrayForComments={arrayWithComments}
        MuiAddingComments={addingComments}
      />
    );     
 

};
