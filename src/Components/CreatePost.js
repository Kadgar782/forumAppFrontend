import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button'
import React, { useState,  } from "react";
import { Link, } from "react-router-dom";


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 750,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const PostFields = ({userName,addingToArray,arrayForAdding,}) => {

  const [tfHeaderValue,setTFHeaderValue ] = useState("");
  const [tfContentValue, setTFContentValue] = useState("");


  // Function for button
  const createNewPost = (upperValue, loverValue) => {
    const username = userName;
    const title = upperValue;
    const body = loverValue;
    const thumbnailUrl = "https://via.placeholder.com/150/54176f";
    const commentsInPost = {}

    const allData = {username, title, body,thumbnailUrl }

    const clearHeaderValue = () => setTFHeaderValue("");
    const clearContentValue = () => setTFContentValue("");

    clearHeaderValue();
    clearContentValue();

    // make request to backend
    const createNewPost = (data) => {
      fetch("http://localhost:5000/api/products", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then(response => response.json())
      .then(result => {
        console.log(result);
      })
      .catch(error => {
        console.error(error);
      });
    }

  createNewPost(allData);

    addingToArray(arrayForAdding,{username,title,body,thumbnailUrl,commentsInPost});



  }
  
  //Modal content

  return (
    <Box sx={style}>
      <TextField
        label="the topic of the post"
        value={tfHeaderValue}
        multiline={true}
        onChange={(newValue) => setTFHeaderValue(newValue.target.value)}
        sx={{
          marginBottom: 1,
          width: 5 / 6,
        }}
      ></TextField>
      <TextField
        label="content"
        multiline={true}
        value={tfContentValue}
        onChange={(newValue) => setTFContentValue(newValue.target.value)}
        sx={{
          width: 1 / 1,
        }}
      ></TextField>
      <Button
        disabled={
          !tfHeaderValue.replace(/\s/g, "").length ||
          !tfContentValue.replace(/\s/g, "").length
        }
        component={Link}
        to="/"
        onClick={() => createNewPost(tfHeaderValue, tfContentValue)}
      >
        Confirm
      </Button>
    </Box>
  );
}