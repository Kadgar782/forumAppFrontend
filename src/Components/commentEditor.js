import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button'
import React, { useState,  } from "react";
import { Link, } from "react-router-dom";




const style = {
  display: 'flex',
  position: 'relative',
  bgcolor: '#ededed',
  borderBottom: '2px solid #000' ,
  borderTop: '2px solid #000' ,
  flexDirection: 'column',
};

export const CommentFields = ({addingToArray,userName,_id}) => {

  const [tfContentValue, setTFContentValue] = useState("");


  // Function for button
  const createNewComment = ( loverValue) => {
    const username = userName;
    const body = loverValue;
    const postId = _id;
    const thumbnailUrl = "https://via.placeholder.com/150/54176f";

    const allData = {username,body,thumbnailUrl,postId}


    const clearContentValue = () => setTFContentValue("");

    clearContentValue();

    // make request to backend
    console.log(postId);
    console.log(username)
   
      fetch("http://localhost:5000/api/comments", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(allData)
      })
      .then(response => response.json())
      .then(result => {
        console.log(result.result);
        addingToArray(result.result)
      })
      .catch(error => {
        console.error(error);
      });


  }
  
  //Modal content

  return (
  
    <Box   flexGrow={2}sx={style}>
      <TextField
        label="Comment" variant="standard"
        multiline={true}
        value={tfContentValue}
        onChange={(newValue) => setTFContentValue(newValue.target.value)}
        sx={{
          width: 1 / 1,
        }}
      ></TextField>
      <Button
        disabled={
          !tfContentValue.replace(/\s/g, "").length
        }
        component={Link}
        to="/"
        onClick={() => createNewComment(tfContentValue)}
      >
        Confirm
      </Button>
    </Box>
   
  );
}