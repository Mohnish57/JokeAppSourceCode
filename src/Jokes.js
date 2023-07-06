import axios from "axios";
import "./jokes.css";
import { useEffect, useState } from "react";

function Jokes() {
  const [jokeCategories, setJokeCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [randomJoke, setRandomJoke] = useState("");

  const fetchJokeCategories = () => {
    axios
      .get("https://api.chucknorris.io/jokes/categories")
      .then((res) => {
        setJokeCategories(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchRandomJoke = (category) => {
    axios
      .get(`https://api.chucknorris.io/jokes/random?category=${category}`)
      .then((res) => {
        setRandomJoke(res.data.value);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleClickCategory = (category) => {
    setSelectedCategory(category);
    fetchRandomJoke(category);
  };

  useEffect(() => {
    fetchJokeCategories();
  }, []);

  return (
    <div className="container">
      <h1 className="heading">Chuck Norris</h1>
      <div className="grid">
        {jokeCategories.map((category) => (
          <div
            className="grid-item"
            key={category}
            onClick={() => handleClickCategory(category)}
          >
            <div className="category-card">
              <div className="card-body">
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </div>
            </div>
          </div>
        ))}
      </div>
      {selectedCategory && (
        <div className="joke-modal">
          <div className="joke-content">
            <div className="joke">{randomJoke}</div>
            <div className="buttons">
              <button className="btn btn-primary">Next</button>
              <button
                className="btn btn-secondary"
                onClick={() => setSelectedCategory("")}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Jokes;
