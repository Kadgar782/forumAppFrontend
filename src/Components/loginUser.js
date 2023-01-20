import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button'
import React, { useState,  } from "react";


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

export const LoginFields = ({setThatUser, modalStatusChange}) => {

  const [tfHeaderValue,setTFHeaderValue ] = useState("");
  const [tfContentValue, setTFContentValue] = useState("");


  // Function for button
  const loginUser = (upperValue, loverValue) => {
    const username = upperValue;
    const password = loverValue;

    const allData = {username, password }

    const clearHeaderValue = () => setTFHeaderValue("");
    const clearContentValue = () => setTFContentValue("");

    clearHeaderValue();
    clearContentValue();

    // make request to backend
    const loginBackendUser =  (data) => {
      
       fetch("http://localhost:5000/auth/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then(response => {
        if (response.status >= 400) {  
          throw new Error("Server responds with error!");
        }
      })
      .then (() => {
        setThatUser(username)
        localStorage.setItem("user", username)
        console.log(username)
      })
      .catch(error => {
        console.error(error);
      }) 

    }

    loginBackendUser(allData);

    modalStatusChange();
    console.log(username)
  }
  
  //Modal content

  return (
    <Box sx={style}>
      <TextField  label="Username" value={tfHeaderValue} multiline={true}
        onChange={(newValue) => setTFHeaderValue(newValue.target.value)}
        sx={{
          marginBottom: 1,
          width: 5 / 6,
        }}>
      </TextField>
      <TextField  label="Password" multiline={true} value={tfContentValue}
        onChange={(newValue) => setTFContentValue(newValue.target.value)}
        sx={{
          width: 1 / 1,
        }}>
      </TextField>
      <Button disabled={(!tfHeaderValue.replace(/\s/g, '').length) || (!tfContentValue.replace(/\s/g, '').length)} onClick={()=> loginUser(tfHeaderValue, tfContentValue)}>Confirm</Button>
    </Box>
  )
}