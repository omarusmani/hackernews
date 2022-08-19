import "./App.css";
import "./components/dropdown.css"
import { formatDistance } from "date-fns";
import React, { useEffect, useState } from "react";
import { Dropdown } from "./components/dropdown";


function App() {
  const [articles, setArticles] = useState([]);
  const [query, setQuery] = useState("");

  async function getArticles(tag, query, bydate, page, hits) {
    console.log(`https://hn.algolia.com/api/v1/search?query=${query}`);
    const response = await fetch(
      `https://hn.algolia.com/api/v1/search?query=${query}`); //need to add date ranges
    // console.log(response)
    const data = await response.json();
    console.log(data)
    setArticles(data.hits); //move to new file for calling including uses effect
  }
  useEffect(() => {
    console.log("Mounted");
    getArticles("", "", "", "", ""); //fixed error where no queries where causing issues with api rejection//this also brings the initial page
  }, []);

  useEffect(() => {
    console.log("Updated!");
    console.log(articles);
  }, [articles]);

  async function getArticlesbyDate(timestamp) {
      const time=getTimeStamp(timestamp)
      console.log(time)
    // console.log(`http://hn.algolia.com/api/v1/search${bydate}?query=${query}&tags=${tag}&hitsPerPage=${hits}&page=${page}`)
    const response = await fetch(
      `https://hn.algolia.com/api/v1/search?tags=story&numericFilters=created_at_i>${time}`
    ); //need to add date range

    const data = await response.json();
    setArticles(data.hits); //move to new file for calling including uses effect
  }


  function handleQuery(event) {
    setQuery(event.target.value);
  }

  function handleSubmit() {
    getArticles("", query, "", "", "");
  }

  function getDate(timestamp) {
    var date = new Date(timestamp * 1000);
    var formattedDate = formatDistance(date, new Date(), { addSuffix: true });
    //  return date.toLocaleDateString("en-US")
    return formattedDate;
  }
  function getTimeStamp(timestamp){
    if(timestamp===24){
      return Math.floor(Date.now() / 1000)-86400;
    }
    if(timestamp===7){
      return Math.floor(Date.now() / 1000)-604800;
    }
    if(timestamp===1){
      return 1;
    }
    if(timestamp===30){
      return Math.floor(Date.now() / 1000)-2629743;
    }
    if(timestamp===12){
      return Math.floor(Date.now() / 1000)-31556926;
    }

  }
  function getUrl(props) {
    // console.log(props.url==null)
    //  console.log( props._url === null ? `https://news.ycombinator.com/item?id=${props.objectID}` : `${props.url}`)
    return props.url === null
      ? `https://news.ycombinator.com/item?id=${props.objectID}`
      : props.url;
  }
  console.log("query", query);
  return (
    <body>
      <section>
        <div className="App">
          <div>
            <h1>
              <a href="https://news.ycombinator.com/" className="favicon">
                H
              </a>
              Search<br></br>
              Hacker News
              <input
                value={query}
                onChange={handleQuery}
                className="search"
                type="text"
                placeholder="Search stories by title, url, or author"
                name="search"
              />
        <button className="search-btn" onClick={handleSubmit}>Submit</button> </h1>
            <form>
              <select>
             <option>Stories</option>
             <option>Comments</option>
             <option >All</option>
             </select>
              <div>by</div>
              <select>
                <option value="blue">Popularity</option>
                <option value="green">Date</option>
              </select>
              <div>for</div>
            <div className="dropdown">
            <div className="dropbtn">All time
            <div className="dropdown-content">
            <div onClick={(e) => getArticlesbyDate(1)}>All time</div>
            <div onClick={(e) => getArticlesbyDate(24)}>24 hours</div>
            <div onClick={(e) => getArticlesbyDate(7)}>One Week</div>
            <div onClick={(e) => getArticlesbyDate(30)}>Past Month</div>
            <div onClick={(e) => getArticlesbyDate(12)}>Past Year</div>
            </div>
            </div>
            </div>
              </form>
            
            <ul>
              {articles.map((article, index) => (
                <li className="posts" key={article.objectID}>
                  <h2>
                    <a
                      href={`https://news.ycombinator.com/item?id=${article.objectID}`}
                    >
                      {article.title}
                    </a>
                    <span>
                      <a href={article.url} className="url">
                        {getUrl(article)}
                      </a>{" "}
                    </span>
                  </h2>

                  {/*add href fot article link on hackernews */}

                  <p>
                    <a
                      href={`https://news.ycombinator.com/item?id=${article.objectID}`}
                    >
                      {article.points}
                    </a>{" "}
                    {/*add two classes in new folder */}
                    <div>|</div>
                    {article.author}
                    <div>|</div>
                    <a
                      href={`https://news.ycombinator.com/item?id=${article.objectID}`}
                    >
                      {getDate(article.created_at_i)}
                    </a>
                    <div>|</div>
                    <a
                      href={`https://news.ycombinator.com/item?id=${article.objectID}`}
                    >{`${article.num_comments} comments`}</a>
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </body>
  );
}

export default App;
