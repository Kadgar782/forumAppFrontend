import {
  AccordionDetails,
  Typography,
  Avatar,
  IconButton,
  Button,
} from "@mui/material";
import { Divider } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Textarea from "@mui/joy/Textarea";
import React, { useState, useContext, createContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import { CommentContext } from "../App.js";
import "react-toastify/dist/ReactToastify.css";

export function Comment({
  updateComment,
  setMappedComments,
  arrayWithCommentsForPost,
  commentId,
  commentBody,
  postId,
  loggedInUser,
  postControls,
}) {
  const [comments, setComments] = useContext(CommentContext);

  let comment = arrayWithCommentsForPost.find(
    (comment) => comment._id === commentId
  );

  const [isEditable, setIsEditable] = useState(false);
  const [body, setBody] = useState(comment.body);

  const username = comment.username;
  const thumbnailUrl = "https://via.placeholder.com/150/54176f";
  const _id = commentId;
  const updatedComment = { _id, body, thumbnailUrl, postId, username };

  //Toast notify
  const notify = (status) => {
    switch (status) {
      case "success":
        toast.success("Comment was deleted");
        break;
      case "successEdit":
        toast.success("Comment has been edited");
        break;
      case "error":
        toast.error("Something went wrong");
        break;
      default:
        break;
    }
  };
  //editing
  const turnEditMode = () => {
    setIsEditable(!isEditable);
    console.log(isEditable);
  };

  const removeElement = async (_id) => {
    try {
      const response = await fetch(
        `http://localhost:5001/api/comments/${_id}`,
        {
          method: "DELETE",
        }
      );
      if (response.status >= 400) {
        throw new Error("Server responds with error!");
      }
      const newComments = comments.filter(
        (arrayForMapping) => arrayForMapping._id !== _id
      );
      setComments(newComments);
      notify("success");
    } catch (error) {
      console.error(error);
      notify("error");
    }
  };

  //Function for button
  const handleSubmit = async (_id) => {
    // make request to backend
    try {
      const response = await fetch(
        `http://localhost:5001/api/comments/${_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedComment),
        }
      );
      if (response.status >= 400) {
        throw new Error("Server responds with error!");
      }
      updateComment(updatedComment, _id);
      turnEditMode();
      notify("successEdit")
    } catch (error) {
      console.error(error);
      notify("error");
    }
  };

  if (postControls === true || username === loggedInUser) {
    //Return if user is admin or author of comment
    return (
      <AccordionDetails
        sx={{
          padding: 0,
          backgroundColor: "#cbcccc",
        }}
      >
        <span>
          <Avatar
            alt="Placeholder"
            src={thumbnailUrl}
            variant="rounded"
            sx={{
              maxWidth: 35,
              maxHeight: 35,
              marginRight: 0.5,
            }}
          />
          {username}

          <IconButton
            aria-label="delete"
            disableRipple
            onClick={() => removeElement(_id)}
          >
            <DeleteIcon />
          </IconButton>

          <IconButton
            aria-label="Edit"
            disableRipple
            id={_id}
            onClick={() => turnEditMode()}
          >
            <EditIcon />
          </IconButton>
        </span>
        {isEditable ? ( //true
          <div style={{ display: "flex", alignItems: "center" }}>
            <Textarea
              size="md"
              className="inputField"
              value={body}
              onChange={(newValue) => setBody(newValue.target.value)}
            >
              {" "}
            </Textarea>
            <Button onClick={() => handleSubmit(_id)}>Done</Button>
            <Button>Cancel</Button>
          </div>
        ) : (
          <Typography id={_id}> {commentBody}</Typography>
        )}

        <Divider sx={{ border: 1 }} />
        <div>
          <ToastContainer />
        </div>
      </AccordionDetails>
    );
  } else {
    //Return if user is not admin or author
    return (
      <AccordionDetails
        sx={{
          padding: 0,
          backgroundColor: "#cbcccc",
        }}
      >
        <span>
          <Avatar
            alt="Placeholder"
            src={thumbnailUrl}
            variant="rounded"
            sx={{
              maxWidth: 35,
              maxHeight: 35,
              marginRight: 0.5,
            }}
          />
          {username}
        </span>
        {isEditable ? ( //true
          <div style={{ display: "flex", alignItems: "center" }}>
            <Textarea
              size="md"
              className="inputField"
              value={body}
              onChange={(newValue) => setBody(newValue.target.value)}
            >
              {" "}
            </Textarea>
            <Button onClick={() => handleSubmit(_id)}>Done</Button>
            <Button>Cancel</Button>
          </div>
        ) : (
          <Typography id={_id}> {commentBody}</Typography>
        )}

        <Divider sx={{ border: 1 }} />
      </AccordionDetails>
    );
  }
}
