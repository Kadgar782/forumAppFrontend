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

export const EditPostFields = ({thePost},updatePost) => {
 
  const id = thePost.id;  
  const [header,setHeader ] = useState(thePost.title);
  const [content, setContent] = useState(thePost.body);

  const updatedPost = {id,header, content}
  // Function for button
  const handleSubmit = () => {
    updatePost(id, updatedPost)
}
  //Modal content

  return (
    <Box sx={style}>
      <TextField  label="the topic of the post" value={header} multiline={true}
        onChange={(newValue) => setHeader(newValue.target.value)}
        sx={{
          marginBottom: 1,
          width: 5 / 6,
        }}>
        {header}
      </TextField>
      <TextField  label="content" multiline={true} value={content}
        onChange={(newValue) => setContent(newValue.target.value)}
        sx={{
          width: 1 / 1,
        }}>
        {content}
      </TextField>
      <Button disabled={(!header.replace(/\s/g, '').length) || (!content.replace(/\s/g, '').length)} onClick={()=>handleSubmit()}>Confirm</Button>
    </Box>
  )
}