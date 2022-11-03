import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button'
import React from "react"
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

 
export const PostFields =({header, content,buttonFunction}) => {
  return(
  <Box sx={style}>
    <TextField label="the topic of the post"  multiline={true} sx={{
      marginBottom: 1,
      width: 5/6,
    }}>
    {header}
    </TextField>
     <TextField label="content" multiline={true} sx={{ 
      width: 1/1,
        }}>
     {content}
     </TextField>
     <Button onClick={buttonFunction}>Confirm</Button>
  </Box>
  )
}