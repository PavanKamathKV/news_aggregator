// src/News.js
import React, { useEffect, useState } from "react";
import "./News.css";

const News = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSource, setSelectedSource] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [error, setError] = useState(null);
  const [fromAuthor, setFromAuthor] = useState("");

  const apiKey = ""// please paste your API key here to run the project, as I dont have subscription to secure the api key in cloud.
  const url = `https://newsapi.org/v2/top-headlines?from=2024-11-03&country=us&apiKey=${apiKey}`;

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Network response err");
        }
        const data = await response.json();
        setArticles(data.articles);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [url]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleSourceChange = (event) => {
    setSelectedSource(event.target.value);
  };

  const handleAuthoredBy = (e) => {
    setFromAuthor(e.target.value);
  };

  const handleDateFromChange = (event) => {
    setDateFrom(event.target.value);
  };

  const handleDateToChange = (event) => {
    setDateTo(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredArticles = articles.filter((article) => {
    const matchesTitleKeyword =
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article?.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory
      ? article.category === selectedCategory
      : true;
    const matchesSource = selectedSource
      ? article.source.name === selectedSource
      : true;

    const matchesAuthor = fromAuthor ? article.author === fromAuthor : true;

    const articleDate = new Date(article.publishedAt);
    const matchesDateRange =
      (!dateFrom || articleDate >= new Date(dateFrom)) &&
      (!dateTo || articleDate <= new Date(dateTo));

    return (
      matchesTitleKeyword &&
      matchesCategory &&
      matchesSource &&
      matchesDateRange &&
      matchesAuthor
    );
  });

  return (
    <div>
      <div className="filterWrapper">
        <div>
          <input
            type="text"
            placeholder="Search by enetring keyword"
            value={searchTerm}
            onChange={handleSearchChange}
            className="keywordClass"
          />
        </div>
        <div className="catSourceWrapper">
          <div className="quarterWidth">
            <select
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="fullWidth"
            >
              <option value="">All Categories</option>
              <option value="business">Business</option>
              <option value="entertainment">Entertainment</option>
              <option value="health">Health</option>
              <option value="science">Science</option>
              <option value="sports">Sports</option>
              <option value="technology">Technology</option>
            </select>
          </div>
          <div className="quarterWidth">
            <select
              value={selectedSource}
              onChange={handleSourceChange}
              className="fullWidth"
            >
              <option value="">All Sources</option>
              <option value="BBC News">BBC News</option>
              <option value="The Seattle Times">The Seattle Times</option>
              <option value="Yahoo Entertainment">Yahoo Entertainment</option>
              <option value="Eonline.com">Eonline.com</option>
              <option value="CBS Sports">CBS Sports</option>
              <option value="CBS News">CBS News</option>
              <option value="WTAE Pittsburgh">WTAE Pittsburgh</option>
              <option value="New York Post">New York Post</option>
              <option value="Deadline">Deadline</option>
              <option value="NPR">NPR</option>
              <option value="The Verge">The Verge</option>
              <option value="Politico">Politico</option>
              <option value="Live Science">Live Science</option>
              <option value="ESPN">ESPN</option>
              <option value="The Washington Post">The Washington Post</option>
              <option value="YouTube">YouTube</option>
              <option value="Associated Press">Associated Press</option>
            </select>
          </div>
        </div>
        <div className="fullWidth">
          <select
            value={fromAuthor}
            onChange={handleAuthoredBy}
            className="halfWidth"
          >
            <option value="">All Authors</option>
            <option value="Dominic Gates">Dominic Gates</option>
            <option value="Melissa Quinn, Olivia Rinaldi">
              Melissa Quinn, Olivia Rinaldi
            </option>
            <option value="Bob Mayo">Bob Mayo</option>
            <option value="Reuters">Reuters</option>
            <option value="Katie Campione">Katie Campione</option>
            <option value="Melissa Quinn">Melissa Quinn</option>
            <option value="Andrew Webster">Andrew Webster</option>
            <option value="Brittany Gibson, Meredith Lee Hill, Adam Cancryn">
              Brittany Gibson, Meredith Lee Hill, Adam Cancryn
            </option>
            <option value="Skyler Ware">Skyler Ware</option>
            <option value="Brady Henderson">Brady Henderson</option>
            <option value="Natalie Rahhal">Natalie Rahhal</option>
            <option value="Michelle Ye Hee Lee">Michelle Ye Hee Lee</option>
            <option value="Inside Edition">Inside Edition</option>
            <option value="WAFAA SHURAFA, SALLY ABOU ALJOUD">
              WAFAA SHURAFA, SALLY ABOU ALJOUD
            </option>
          </select>
        </div>
        <div>
          Date From:{" "}
          <input type="date" value={dateFrom} onChange={handleDateFromChange} />
        </div>
        <div>
          Till Date:{" "}
          <input type="date" value={dateTo} onChange={handleDateToChange} />
        </div>
      </div>
      <ul>
        {filteredArticles.length > 0
          ? filteredArticles.map((article, index) => (
              <div key={index}>
                <div className="newsWrapper">
                  <p className="titleClass">{article.title}</p>
                  <p className="descClass">{article.description}</p>
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="color_white"
                  >
                    Read more about this news
                  </a>
                </div>
              </div>
            ))
          : "No Articles found"}
      </ul>
    </div>
  );
};

export default News;
