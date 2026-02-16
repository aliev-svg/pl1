import { useEffect, useState } from "react";
import { getData } from "../api/fakeApi";
import { Link } from "react-router-dom";

export default function Posts() {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    getData().then(res => setPosts(res.posts));
  }, []);

  if (!posts) return <h2>Загрузка...</h2>;

  return (
    <div>
      <h1>Список постов</h1>

      {posts.map(post => (
        <div key={post.id}>
          <Link to={`/posts/${post.id}`}>
            <h3>{post.title}</h3>
          </Link>
        </div>
      ))}
    </div>
  );
}
