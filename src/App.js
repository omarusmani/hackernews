
import './App.css';
import { formatDistance, } from 'date-fns'
import React, { useEffect, useState } from "react";

function App() {
  const [articles, setArticles] = useState([]);

  async function getArticles(tag,query,bydate,page,hits) {
    // console.log(`http://hn.algolia.com/api/v1/search${bydate}?query=${query}&tags=${tag}&hitsPerPage=${hits}&page=${page}`)
    const response = await fetch(`http://hn.algolia.com/api/v1/search${bydate}?query=${query}&tags=${tag}&hitsPerPage=${hits}&page=${page}`);
    const data = await response.json();
    setArticles(data.hits);
  }

  useEffect(() => {
    console.log("Mounted");
    getArticles("","","","","");//fixed error where no queries where causing issues with api rejection//this also brings the initial page 
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
  function getUrl(props){
    // console.log(props.url==null)
    //  console.log( props._url === null ? `https://news.ycombinator.com/item?id=${props.objectID}` : `${props.url}`)
     return (props.url === null ? `https://news.ycombinator.com/item?id=${props.objectID}` :props.url)

  }


  return (

    <div className="App">
      <div>
      <h1>
        <a href="https://news.ycombinator.com/"className="favicon">H</a>
        Search<br></br>
        Hacker News</h1>
        <button onClick={()=>getArticles("","","","","")}>Hello</button>
        <button onClick={()=>getArticles("comment","","","","")}>Hello</button>
        <button onClick={()=>getArticles("ask_hn","","","","")}>Hello</button>
        <button onClick={()=>getArticles("front_page","","","","")}>Hello</button>

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
      <option onClick={()=>getArticles("","yellow","","","")} value='blue'>All time</option>
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
            <h2><a href={`https://news.ycombinator.com/item?id=${article.objectID}`}>{article.title}</a></h2>
            {/* {/* <span>{index}</span> */}
            <a href={article.url} className="url">{getUrl(article)}</a> {/*add href fot article link on hackernews */}
            <span className='bottom'>
            <br></br>
            <a href={`https://news.ycombinator.com/item?id=${article.objectID}`}>{article.points}</a>
            <div>|</div>
            <div>{article.author}</div>
            <div>|</div>
            <a href={`https://news.ycombinator.com/item?id=${article.objectID}`}>{getDate(article.created_at_i)}</a>
            <div>|</div>
            <a href={`https://news.ycombinator.com/item?id=${article.objectID}`}>{`${article.num_comments} comments`}</a>
            </span>
            <br></br>
        </li>
        ))}
      </ul>
      </div>
    </div>
  );
}

export default App;
