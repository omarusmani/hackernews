import logo from './logo.svg';
import './App.css';
import { format, formatDistance, formatRelative, subDays } from 'date-fns'
import React, { useEffect, useState } from "react";

function App() {
  const [articles, setArticles] = useState([]);

  async function getArticles(props) {
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
    var formattedDate= formatDistance(date, new Date(), { addSuffix: true })
  //  return date.toLocaleDateString("en-US")
  return formattedDate;
  }


  return (

    <div className="App">
      <body>
      <h1>
        <a href="https://news.ycombinator.com/"className="favicon">H</a>
        Search<br></br>
        Hacker News</h1>
        <form>
        <div>Search</div>
        <button>
        </button>
        <div>by</div>
        <button>
        </button>
        <div>for</div>
        <button>
        </button>
        </form>
      <ul>
       {articles.map((article, index)=>(
        <li className="posts" key={article.objectID}>
            <a href={article.url}>{article.title}</a>
            <div></div>
            <h4 className="url">(${article.url})</h4>
            <h5>{article.points}</h5>
            <h3>{article.author}</h3>
            <h4>{getDate(article.created_at_i)}</h4>
        </li>
        ))}
      </ul>
      </body>
    </div>
  );
}

export default App;
