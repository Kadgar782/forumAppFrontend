import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button'
import React, { useState,  } from "react";

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 750,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const PostFields = ({ header, content,addingToArray}) => {

  const [tfHeaderValue,setTFHeaderValue ] = useState("");
  const [tfContentValue, setTFContentValue] = useState("");

  // Function for button
  const createNewPost = (upperValue, loverValue) => {

    const userId = "Mak";
    const id = Math.random().toString(16).slice(2);
    const title = upperValue;
    const body = loverValue;
    const avatars = { thumbnailUrl: "https://via.placeholder.com/150/54176f" }
    const commentsInPost = {}

    const clearHeaderValue = () => setTFHeaderValue("");
    const clearContentValue = () => setTFContentValue("");

    clearHeaderValue();
    clearContentValue();

    addingToArray({userId,id,title,body,avatars,commentsInPost})
  }
  
  //Modal content

  return (
    <Box sx={style}>
      <TextField  label="the topic of the post" value={tfHeaderValue} multiline={true}
        onChange={(newValue) => setTFHeaderValue(newValue.target.value)}
        sx={{
          marginBottom: 1,
          width: 5 / 6,
        }}>
        {header}
      </TextField>
      <TextField  label="content" multiline={true} value={tfContentValue}
        onChange={(newValue) => setTFContentValue(newValue.target.value)}
        sx={{
          width: 1 / 1,
        }}>
        {content}
      </TextField>
      <Button disabled={(!tfHeaderValue.replace(/\s/g, '').length) || (!tfContentValue.replace(/\s/g, '').length)} onClick={()=>createNewPost(tfHeaderValue, tfContentValue)}>Confirm</Button>
    </Box>
  )
}
