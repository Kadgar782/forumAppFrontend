
import './App.css';

function App() {
  const mappedPosts = [{
  
  "userId": "Bret",
  "id": 1,
  "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
  "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
  "commentsInPost": {
    "postId": 1,
    "id": 1,
    "name": "id labore ex et quam laborum",
    "email": "Eliseo@gardner.biz",
    "body": "laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium"
  },
  "avatars": {
    "albumId": 1,
    "id": 1,
    "title": "accusamus beatae ad facilis cum similique qui sunt",
    "url": "https://via.placeholder.com/600/92c952",
    "thumbnailUrl": "https://via.placeholder.com/150/92c952"
  }


 }]

 

  console.log(mappedPosts);
  

  // Creating Post with JSX
  return (
    <div className='inner'>
      {mappedPosts.map((post) => {
        return (
          <div key={post.id}>
            <h1>{post.title}</h1>

            <p>
              {post.body}
              <span>
                {post.userId}
                <img className ="Avatar" src={post.avatars.thumbnailUrl} />
              </span>
            </p>
            <button  className ="accordion">
              Comments
            </button>
            <div className ="panel">
              <p>
                {post.commentsInPost.body}
                <span>
                  {post.commentsInPost.name}
                  <img className ="Avatar" src={post.avatars.thumbnailUrl} />
                </span>
              </p>
            </div>

     
          </div>
        );
      })}
    </div>
  );
}
export default App;

