
import './App.css';
async function loadPage() {
  //Getting Post content
    let responsePosts = await fetch("https://jsonplaceholder.typicode.com/posts");
    let posts = await responsePosts.json();

  // Getting User names
    let responseUsers = await fetch("https://jsonplaceholder.typicode.com/users");
    let users = await responseUsers.json();
  // Gettinf Photos
   let responsePhotos = await fetch ("https://jsonplaceholder.typicode.com/photos");
   let photos = await responsePhotos.json();
  // Getting Comments
   let responseComments = await fetch ("https://jsonplaceholder.typicode.com/comments");
   let comments = await responseComments.json();
   //Add Avatar
const mappedPosts = posts.map((p) => {
  const avatars = photos.find((u) => u.id === p.userId); // userId в постах 
//Add Comments
  const commentsInPost = comments.find((u) => u.id === p.userId);

// Changing ID
  const createdBy = users.find((u) => u.id === p.userId);
  return {
    ...p, 
    commentsInPost,
    avatars,
    userId: createdBy ? createdBy.username : "Unknown user",
  }
});
console.log(mappedPosts)
  //Creating Post
  for (let post of mappedPosts) {
    const container = document.getElementById("root");
    const resultedPost = createPost(post);
    const postWrapper = document.createElement("div");
    postWrapper.classList.add("inner");
    postWrapper.innerHTML = resultedPost;
    container.appendChild(postWrapper);
  }
  // Accordion

let acc = document.getElementsByClassName("accordion");
for (let i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    /* Toggle between adding and removing the "active" class,
    to highlight the button that controls the panel */
    this.classList.toggle("active");

    /* Toggle between hiding and showing the active panel */
    let panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
} 
}


function App() {
  loadPage();
 
}

function createPost(post) {
  return `
    <h1>${post.title}</h1>
    <p>${post.body}<span>${post.userId}<img class="Avatar" src=${post.avatars.thumbnailUrl}></span></p>
    <button class="accordion">Comments</button>
      <div class="panel">
        <p>${post.commentsInPost.body}<span>${post.commentsInPost.name}<img class="Avatar" src=${post.avatars.thumbnailUrl}></span></p></p>
        
      </div>
  `;
}




export default App;
