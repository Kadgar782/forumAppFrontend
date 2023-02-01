import { Typography, Avatar, IconButton } from "@mui/material";
import { CommentSchema } from "./CommentBlueprint";
import { Divider } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import React, {createContext, useContext} from "react";
  //Context

  export const postContext = createContext("without provider");

export const PostSchema = ({ arrayWithPosts, checkingId, deleteElement }) => {
  return arrayWithPosts.map((post) => {
    return (
      <postContext.Provider value={post._id}>
      <div className="inner" key={post._id}>
        <Typography variant="h5">
          {post.title}

          <IconButton
            aria-label="Edit"
            disableRipple
            id={post._id}
            onClick={checkingId}
          >
            <EditIcon />
          </IconButton>

          <IconButton
            aria-label="delete"
            disableRipple
            onClick={() => deleteElement(post._id)}
          >
            <DeleteIcon />
          </IconButton>
        </Typography>
        <p>{post.body}</p>

        <span>
          <Avatar
            alt="Placeholder"
            src={post.thumbnailUrl}
            variant="rounded"
            sx={{
              maxWidth: 35,
              maxHeight: 35,
              marginRight: 0.5,
            }}
          />
          {post.username}
        </span>
        <Divider sx={{ border: 1 }} />
        <CommentSchema wholePost={post.commentsInPost} />
      </div>
      </postContext.Provider>
    );
  });
};
