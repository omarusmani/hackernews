import React, { useEffect, useState } from "react";
import { format, formatDistance, formatRelative, subDays } from "date-fns";

import "./App.css";

function App() {
  const [articles, setArticles] = useState([]);

  async function getArticles(props) {
    const response = await fetch(
      "http://hn.algolia.com/api/v1/search?tags=front_page"
    );
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

  function getDate(timestamp) {
    var date = new Date(timestamp * 1000);
    var formattedDate = formatDistance(date, new Date(), { addSuffix: true });
    //  return date.toLocaleDateString("en-US")
    return formattedDate;
  }

  return (
    <body>
      <section>
        <div>
          <article>
            <h1>
              <a href="https://news.ycombinator.com/" className="favicon">
                H
              </a>
              Search<br></br>
              Hacker News
            </h1>
          </article>

          <form>
            <div>Search</div>
            <button></button>
            <div>by</div>
            <button></button>
            <div>for</div>
            <button></button>
          </form>
          <article>
            <div>
              <ul>
                {articles.map((article, index) => (
                  <li className="posts" key={article.objectID}>
                    <h2>
                      <a href={article.url}>{article.title}</a>
                      <span>({article.url})</span>
                    </h2>

                    <p>
                      {article.points} points <div class="verticalLine"></div>
                      {article.author}
                      <div class="verticalLine"></div>
                      {getDate(article.created_at_i)}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        </div>
      </section>
    </body>
  );
}

export default App;
