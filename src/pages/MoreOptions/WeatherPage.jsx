// src/pages/WeatherPage.jsx
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./WeatherPage.css";
import cities from "../../data/city.list.json";

const WeatherPage = () => {
  const navigate = useNavigate();
  const videoRef = useRef();

  const [phase, setPhase] = useState("entry");
  const [location, setLocation] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.onended = () => {
      if (phase === "entry") setPhase("weather");
      else if (phase === "exit") navigate(-1);
    };

    if (phase === "entry") {
      video.src = "/src/cloudf.mp4";
      video.load();
      video.play().catch(() => {});
    } else if (phase === "exit") {
      video.src = "/src/cloudr.mp4";
      video.load();
      video.play().catch(() => {});
    }
  }, [phase]);

  useEffect(() => {
    if (phase !== "weather" || !location) return;

    const apiKey = "d7431820a400484ddae8e98dd675fdfa";
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&appid=${apiKey}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data.cod === "200" || data.cod === 200) {
          setWeatherData(data);
        } else {
          setWeatherData(null);
        }
      })
      .catch(() => {
        setWeatherData(null);
      });
  }, [location, phase]);

  const handleBack = () => setPhase("exit");

  const detectLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      const apiKey = "d7431820a400484ddae8e98dd675fdfa";
      const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          setLocation(data.city.name);
          setWeatherData(data);
        });
    });
  };

  const handleInput = (e) => {
    const val = e.target.value;
    setLocation(val);
    if (val.length > 2) {
      const matches = cities
        .filter((c) => c.name.toLowerCase().startsWith(val.toLowerCase()))
        .slice(0, 10);
      setSuggestions(matches);
    } else {
      setSuggestions([]);
    }
  };

  const selectCity = (name) => {
    setLocation(name);
    setSuggestions([]);
  };

  const today = weatherData?.list?.[0];

  return (
    <div className="weather-container">
      {(phase === "entry" || phase === "exit") && (
        <video ref={videoRef} className="cloud-video" muted autoPlay playsInline />
      )}

      {phase === "weather" && (
        <div className="weather-ui-wrapper fade-in">
          <div className="weather-card fade-in">
            <h2>Weather Forecast</h2>

            <div className="location-bar" style={{ position: "relative" }}>
              <input
                type="text"
                placeholder="Search location..."
                value={location}
                onChange={handleInput}
              />
              <button onClick={detectLocation}>📍</button>

              {suggestions.length > 0 && (
                <ul className="suggestion-list">
                  {suggestions.map((city, i) => (
                    <li key={i} onClick={() => selectCity(city.name)}>
                      {city.name}, {city.country}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {today && (
              <div className="today">
                <h3>Today</h3>
                <p>🌡️ Temp: {today.main.temp} °C</p>
                <p>💧 Humidity: {today.main.humidity}%</p>
                <p>🌫️ AQI (mock): {(Math.random() * 200).toFixed(0)}</p>
                <p>🌤️ {today.weather[0].description}</p>
              </div>
            )}

            <h4>Next 5 Days</h4>
            <div className="forecast-grid">
              {weatherData?.list
                ?.filter((_, i) => i % 8 === 0)
                .slice(1, 6)
                .map((item, i) => (
                  <div key={i} className="forecast-card">
                    <p>{new Date(item.dt_txt).toDateString()}</p>
                    <p>🌡️ {item.main.temp} °C</p>
                    <p>💧 {item.main.humidity}%</p>
                    <p>{item.weather[0].main}</p>
                  </div>
                ))}
            </div>

            <button className="exit-button" onClick={handleBack}>Back</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherPage;
