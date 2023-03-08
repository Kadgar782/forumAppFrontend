import React, { useState, useEffect, createContext } from "react";
import { Box, IconButton, Typography,Toolbar,AppBar, Button, Modal} from "@mui/material";
import { createBrowserRouter, Routes, Route, Link} from "react-router-dom";
import {PostFields} from "./Components/CreatePost.js";
import { EditPostFields } from "./Components/editPost.js";
import { PostSchema } from "./Components/PostBlueprint.js";
import MenuIcon from '@mui/icons-material/Menu';
import  {LoginFields} from "./Components/loginUser.js"
import {RegistrationFields} from "./Components/registrationFields.js"
import './App.css';

//Context
export const userContext = createContext("without user provider");


function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [mappedPosts, setMappedPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [userList, setUser] = useState([]);
  const [currentUser, setCurrentUser] = useState("");
  const [idForEditing, setID] = useState([]);
  const [loginOpen, setLoginOpen] = useState(false);
  const [registrationOpen, setRegistrationOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [token, setToken] = useState("");

  //Getting Post content
  useEffect(() => {
    // declare the async data fetching function
    const fetchData = async (url) => {
      // get the data from the api
      const response = await fetch(url);
      // convert the data to json
      const json = await response.json();

      // set state with the result
      return json;
    };
    //Getting Comments
    const getComments = async () => {
      const resComments = await fetchData("http://localhost:5000/api/comments");

      const comments = resComments.result;

      setComments(comments);
    };

    const getPostsAuth = async (bearerToken) => {
      console.log(bearerToken);
      const response = await fetch("http://localhost:5000/api/data", {
        headers: {
          Authorization: `Bearer ${bearerToken}`, // передаем токен в заголовке
        },
      });
      console.log(
        "токен перед отправкой " + bearerToken + " отправил на бэк запрос"
      );
      const post = await response.json();
      const revPost = post.data.reverse();
      console.log(revPost);

      setMappedPosts(revPost);
    };

    // checking whether the user has already been logged in
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      setCurrentUser(loggedInUser);
    }

    // checcking user token
    const localToken = localStorage.getItem("token");
    if (localToken) {
      setToken(localToken);
    }

    getPostsAuth(localToken)
      .then(() => getComments())
      .then(() => setIsLoading(false));
  }, [currentUser]);


  //Post remove function
  const removeElement = (_id) => {
    //Backend fetch
      fetch(`http://localhost:5000/api/products/${_id}`, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.error(error));


    const newPosts = mappedPosts.filter(
      (mappedPosts) => mappedPosts._id !== _id
    );

    setMappedPosts(newPosts);
  };

  // Modal changes
  const handleEditableModalToggle = () => setEditOpen(!editOpen);
  //Registration Modal
  const handleRegistrationModalToggle = () => {
    setRegistrationOpen(!registrationOpen);
  };
  //Login Modal
  const handleLoginModalToggle = () => {
    setLoginOpen(!loginOpen);
  };

  //Search for a post by ID via the button
  const checkId = (event) => {
    setID(event.currentTarget.id);
    console.log(event.currentTarget.id);
    handleEditableModalToggle();
  };
  //Logging out and clearing the local storage
  const logOut = () => {
    setCurrentUser("");
    localStorage.clear();
  };

  //Set current User
  const setTheUser = (username) => {
    setCurrentUser(username);
  };

  //Сhanging a post with a specific id
  const updatePost = (updatedPost) => {
    setMappedPosts(
      mappedPosts.map((post) =>
        post._id === idForEditing ? updatedPost : post
      )
    );
  };

  //Changing comment
  const updateComment = (updatedComment, commentId) => {
    setComments(
      comments.map((comment) =>
        comment._id === commentId ? updatedComment : comment
      )
    );
  };

  //Adding new data from a component
  const addingToMappedPosts = (added) => {
    setMappedPosts([added, ...mappedPosts]);
  };
  const addingToUserList = (added) => {
    setUser([added, ...userList]);
  };
  const addingToComments = (added) => {
    setComments((comments) => [added, ...comments]);
    console.log(added);
    console.log(comments);
  };

  console.log(mappedPosts);

  // Creating Post with JSX
  return (
    <userContext.Provider value={currentUser}>
      <div className="outer">
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                component={Link}
                to="/"
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 1 }}
              ></Typography>
              {currentUser === "" ? null : (
                <Button color="inherit" component={Link} to="/editor">
                  Create new post
                </Button>
              )}
              {currentUser === "" ? (
                <Button color="inherit" onClick={handleLoginModalToggle}>
                  Login
                </Button>
              ) : (
                <Button color="inherit" onClick={logOut}>
                  Log out
                </Button>
              )}
              {currentUser === "" ? (
                <Button color="inherit" onClick={handleRegistrationModalToggle}>
                  Registration
                </Button>
              ) : null}
            </Toolbar>
          </AppBar>
        </Box>

        <Routes>
          <Route
            path="/editor"
            element={
              <PostFields
                userName={currentUser}
                arrayForAdding={mappedPosts}
                addingToArray={addingToMappedPosts}
              />
            }
          />
          <Route
            path="/"
            element={
              isLoading ? (
                <div>IS loading...</div>
              ) : (
                <PostSchema
                  updateComment={updateComment}
                  presentUser={currentUser}
                  mainArrayWithComments={comments}
                  functionForAddingComments={addingToComments}
                  arrayWithPosts={mappedPosts}
                  checkingId={checkId}
                  deleteElement={removeElement}
                  setMappedComments={setComments}
                />
              )
            }
          />
        </Routes>

        <Modal open={loginOpen} onClose={handleLoginModalToggle}>
          <LoginFields
            modalStatusChange={handleLoginModalToggle}
            setThatUser={setTheUser}
            setThatToken={setToken}
          />
        </Modal>

        <Modal open={registrationOpen} onClose={handleRegistrationModalToggle}>
          <RegistrationFields
            modalStatusChange={handleRegistrationModalToggle}
            addingToArray={addingToUserList}
          />
        </Modal>

        <Modal open={editOpen} onClose={handleEditableModalToggle}>
          <EditPostFields
            modalStatusChange={handleEditableModalToggle}
            specificId={idForEditing}
            allPosts={mappedPosts}
            updatePost={updatePost}
          />
        </Modal>
      </div>
    </userContext.Provider>
  );
}
export default App;
