import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from "react";

function App() {
  const [articles, setArticles] = useState([]);

  async function getArticles() {
    const response = await fetch("http://hn.algolia.com/api/v1/search?tags=front_page");
    const data = await response.json();
    setArticles(data.hits);
  }

  useEffect(() => {
    console.log("Mounted");
    getArticles();
  }, []);

  useEffect(() => {
    console.log("Updated!");
    console.log(articles);
  }, [articles]);

  function getDate(timestamp){
   var date = new Date(timestamp * 1000);
   return date.toLocaleDateString("en-US")
  }
  return (

    <div className="App">
      <ul>
       {articles.map((article, index)=>(
        <li className="posts" key={article.objectID}>
            <h2 href={article.url}>{article.title}</h2>
            <h2></h2>
            <h4>{article.url}</h4>
            <h5>{article.points}</h5>
            <h3>{article.author}</h3>
            <h4>{getDate(article.created_at_i)}</h4>
        </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
