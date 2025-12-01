import React, { useEffect, useState } from "react";

function NewsList() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_KEY = "6aae5512f6a1497a81e41e626c0e2486";

  useEffect(() => {
    fetch(
      `https://news-proxy.netlify.app/top-headlines?country=us&apiKey=${API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        setArticles(data.articles);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading news...</p>;

  return (
    <div>
      <h2>Top Headlines</h2>
      <div style={styles.grid}>
        {(articles || []).map((item, index) => (
          <div key={index} style={styles.card}>
            <img
              src={item.urlToImage}
              alt=""
              style={{ width: "100%", borderRadius: "8px 8px 0 0" }}
            />
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <a href={item.url} target="_blank">
              Read more
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
  },
  card: {
    padding: "15px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    background: "#4c4b4bff",
  },
};

export default NewsList;
