import { useState, useEffect } from "react";
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
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=2`
      );
      const data: Post[] = await response.json(); // Parse JSON response
      setPosts((prevPosts) => [...prevPosts, ...data]); 
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 10
    ) {
      setPage((prev) => prev + 1); // Load the next page
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [page]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);""

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id} className="card">
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </div>
      ))}
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default Card;
