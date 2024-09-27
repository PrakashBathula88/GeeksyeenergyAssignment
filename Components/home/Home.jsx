import axios from "axios";
import React, { useEffect, useState } from "react";
import "../home/Home.css"
const Home = () => {
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortOption, setSortOption] = useState("rating");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        setData(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const sortedData = data.slice().sort((a, b) => {
    if (sortOption === "rating") {
      return b.rating.rate - a.rating.rate;
    } else if (sortOption === "price") {
      return b.price - a.price;
    } else if (sortOption === "alphabets") {
      return a.title.localeCompare(b.title);
    }
  });
  return (
    <div className="home-container">
      <div className="home-header">
        <h1>Products</h1>
        <div className="sort-options">
          <label>Sorting :</label>
          <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
            <option value="rating">Rating</option>
            <option value="price">Price</option>
            <option value="alphabets">Alphabets</option>
          </select>
        </div>
      </div>

      {loading ? (
        <p className="loading">Loading...</p>
      ) : error ? (
        <p className="error">Error: {error}</p>
      ) : (
        <div className="product-list-flex">
          {sortedData.map((item, id) => (
            <div key={id} className="product-item">
              <img src={item.image} alt={item.title} />
              <div className="product-info">
                <h2>{item.title}</h2>
                <p>{item.description}</p>
                <p className="rating">
                  Rating: {item.rating.rate} ({item.rating.count})
                </p>
                <p className="price">${item.price}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;