import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 750,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const LoginFields = ({
  setThatToken,
  setThatUser,
  modalStatusChange,
}) => {
  const [tfHeaderValue, setTFHeaderValue] = useState("");
  const [tfContentValue, setTFContentValue] = useState("");

  // Function for button
  const loginUser =  async (upperValue, loverValue) => {
    const username = upperValue;
    const password = loverValue;

    const allData = { username, password };

    const clearHeaderValue = () => setTFHeaderValue("");
    const clearContentValue = () => setTFContentValue("");

    clearHeaderValue();
    clearContentValue();

    //Toast notify
    const notify = (status, username) => {
      switch (status) {
        case "success":
          toast.success(`you have successfully logged in as ${username}`);
          break;
        case "error":
          toast.error("Something went wrong");
          break;
        default:
          break;
      }
    };


    // make request to backend
      try {
         const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          credentials: "include",
        },
        body: JSON.stringify(allData),
      });
      if (response.status >= 400) {
        notify("error", "")
        throw new Error("Server responds with error!");   
      } 
        const data = await response.json();
        const token = data.token;
        setThatToken(token.accessToken);
        setThatUser(username);
        console.log(username)
        localStorage.setItem("user", username);
        localStorage.setItem("token", token.accessToken)     
        notify("success", username)
       } catch  (error) { 
        console.error(error);
        notify("error");
        }
    modalStatusChange();
  };
  

  //Modal content

  return (
    <Box sx={style}>
      <TextField
        label="Username"
        value={tfHeaderValue}
        multiline={true}
        onChange={(newValue) => setTFHeaderValue(newValue.target.value)}
        sx={{
          marginBottom: 1,
          width: 5 / 6,
        }}
      ></TextField>
      <TextField
        label="Password"
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
        onClick={() => loginUser(tfHeaderValue, tfContentValue)}
      >
        Confirm
      </Button>
      <div>
          <ToastContainer />
        </div>
    </Box>
  );
};
