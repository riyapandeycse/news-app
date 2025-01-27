import  { useState, useEffect } from "react";
import "./card.css";


type Post = {
  id: number;
  title: string;
  body: string;
};

const Card = () => {
  const [posts, setPosts] = useState<Post[]>([]); 
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchPosts = async () => {
    setLoading(true);

    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=2`);
      const data: Post[] = await response.json(); // Parse JSON response
      setPosts((prevPosts) => [...prevPosts, ...data]); 
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [page]);

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id} className="card">
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </div>
      ))}
      {loading && <p>Loading...</p>}
      <button onClick={() => setPage((prev) => prev + 1)}>Load More</button>
    </div>
  );
};

export default Card;
