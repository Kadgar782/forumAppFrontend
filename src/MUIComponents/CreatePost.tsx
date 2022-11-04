import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button'
import React, { useState } from "react";
import { Divider, Typography} from "@mui/material";

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

export const PostFields = ({ header, content }) => {
  const [tfHeaderValue,setTFHeaderValue ] = useState("");
  const [tfContentValue, setTFContentValue] = useState("");
  const createNewPost = (value1, value2) => {
    const headerContent=value1;
    const bodyContent=value2;
    const clearHeaderValue=()=> setTFHeaderValue("");
    const clearContentValue=()=>setTFContentValue("");
    clearHeaderValue();
    clearContentValue();
    console.log(headerContent)
    return(
      <div className="inner" >
              <Typography variant="h5">
                {headerContent}
              </Typography>
              <p>{bodyContent}</p>
              <Divider sx={{ border: 1 }} />
              </div>
    )
  }
  
  return (
    <Box sx={style}>
      <TextField label="the topic of the post" value={tfHeaderValue} multiline={true}
        onChange={(newValue) => setTFHeaderValue(newValue.target.value)}
        sx={{
          marginBottom: 1,
          width: 5 / 6,
        }}>
        {header}
      </TextField>
      <TextField label="content" multiline={true} value={tfContentValue}
        onChange={(newValue) => setTFContentValue(newValue.target.value)}
        sx={{
          width: 1 / 1,
        }}>
        {content}
      </TextField>
      <Button onClick={()=>createNewPost(tfHeaderValue, tfContentValue)}>Confirm</Button>
    </Box>
  )
}
