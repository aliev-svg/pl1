import { useEffect, useState } from 'react';
import { getData } from '../api/fakeApi';

export default function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    getData().then(res => setData(res));
  }, []);

  if (!data) return <h2>Загрузка...</h2>;

  return (
    <div>
      <h1>Главная</h1>

      <h2>Посты</h2>
      {data.posts.map(post => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.text}</p>
        </div>
      ))}

      <h2>Продукты</h2>
      {data.products.map(prod => (
        <div key={prod.id}>
          <p>{prod.name} — {prod.price}₽</p>
        </div>
      ))}
    </div>
  );
}
