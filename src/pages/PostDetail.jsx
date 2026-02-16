import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getData } from "../api/fakeApi";

export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    getData().then(res => {
      const found = res.posts.find(p => p.id === Number(id));
      setPost(found);
    });
  }, [id]);

  if (!post) return <h2>Загрузка...</h2>;

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.text}</p>
    </div>
  );
}
