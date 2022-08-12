
import './App.css';
import { formatDistance, } from 'date-fns'
import React, { useEffect, useState } from "react";

function App() {
  const [articles, setArticles] = useState([]);

  async function getArticles(props) {
    const response = await fetch(`http://hn.algolia.com/api/v1/search?tags=${props}`);
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
      <div>
      <h1>
        <a href="https://news.ycombinator.com/"className="favicon">H</a>
        Search<br></br>
        Hacker News</h1>
        <button onClick={getArticles("")}>Hello</button>
        <form>
        <div>Search</div>
    <select>
      <option value='blue'>Stories</option>
      <option value='green'>All</option>
      <option value='red'>Comments</option>
    </select>
        <div>by</div>
        <select>
      <option value='blue'>Popularity</option>
      <option value='green'>Date</option>
    </select>
        <div>for</div>
      <select>
      <option value='blue'>All time</option>
      <option value='green'>Last 24h</option>
      <option value='red'>Past Week</option>
      <option value='yellow'>Past Month</option>
      <option value='yellow'>Past Year</option>
      <option value='yellow'>Custom range</option>

    </select>
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
      </div>
    </div>
  );
}

export default App;
