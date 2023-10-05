import { useState } from "react";

const api = {
  key: "7d05b9f84f69a7bd0489c97246851d3a",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  function search(evt) {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setQuery("");
          setWeather(result);
          console.log(result);
        })
        .catch((error) => {
          console.error("Error fetching weather data:", error);
          setWeather({}); // Set an empty object to clear any previous data
        });
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      search(e);
    }
  }

  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  return (
    <div
      className={
        typeof weather.main != "undefined"
          ? weather.main.temp > 16
            ? "app warm"
            : "app"
          : "app"
      }
    >
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div className="location-box">
          <div className="location">
            {weather.name && weather.sys && weather.sys.country
              ? `${weather.name}, ${weather.sys.country}`
              : "Location Not Found"}
          </div>
          <div className="date">{dateBuilder(new Date())}</div>
        </div>
        <div className="weather-box">
          <div className="temp">
            {weather.main && Math.round(weather.main.temp)}°c
          </div>
          <div className="weather">
            {weather.weather && weather.weather[0]
              ? weather.weather[0].main
              : "Weather Not Found"}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
