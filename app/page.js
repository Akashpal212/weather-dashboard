"use client";

import { useState, useEffect } from "react";
import Loader from "@/components/Loader";
import ErrorBanner from "@/components/ErrorBanner";
import WeatherCard from "@/components/WeatherCard";

const Page = () => {
  const [city, setCity] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavorites(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const fetchWeather = async (cityName) => {
    setError(null);
    setData(null);

    if (!cityName.trim()) return setError("Please enter a city name.");

    setLoading(true);
    try {
      const res = await fetch(`/api/weather?city=${encodeURIComponent(cityName.trim())}`);
      const body = await res.json();

      res.ok ? setData(body) : setError(body?.message || "Failed to fetch weather.");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    fetchWeather(city);
  };

  const addFavorite = () => {
    if (data && data.city) {
      const cityName = data.city;
      if (!favorites.includes(cityName)) {
        setFavorites([...favorites, cityName]);
      }
    } else {
      setError("Please search a valid city before adding to favorites.");
    }
  };

  const removeFavorite = (fav) => {
    setFavorites(favorites.filter((c) => c !== fav));
  };

  return (
    <main className="container">
      <h1>🌍 Weather Dashboard</h1>

      <form onSubmit={handleSubmit} className="form" aria-label="Search city weather">
        <input
          type="text"
          placeholder="Enter city (e.g. Mumbai)"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          aria-label="City name"
        />
        <button type="submit" disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </button>
        <button type="button" onClick={addFavorite} className="secondary-btn">
          ⭐ Add Favorite
        </button>
      </form>

      {loading && <Loader />}
      {error && <ErrorBanner message={error} />}
      {data && <WeatherCard data={data} />}

      {favorites.length > 0 && (
        <section className="favorites">
          <h2>⭐ Favorite Cities</h2>
          <ul>
            {favorites.map((fav) => (
              <li key={fav}>
                <button onClick={() => fetchWeather(fav)}>{fav}</button>
                <span onClick={() => removeFavorite(fav)} className="remove">✖</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <style jsx>{`

        /* Base (desktop-first, large screens) */
        .container {
          max-width: 800px;
          margin: 3rem auto;
          padding: 1rem;
          text-align: center;
        }

        h1 {
          font-size: 2.2rem;
          font-weight: 700;
          margin-bottom: 2.5rem;
        }

        .form {
          display: flex;
          gap: 0.5rem;
          justify-content: center;
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
        }

        input {
          flex: 1;
          max-width: 250px;
          padding: 0.7rem 1rem;
          border: 1px solid #d1d5db;
          border-radius: 0.75rem;
          font-size: 1rem;
        }

        /* Buttons default */
        button {
          padding: 0.7rem 1.2rem;
          border-radius: 0.75rem;
          border: none;
          background: #2563eb;
          color: white;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s ease;
        }
        button:hover:not(:disabled) {
          background: #1d4ed8;
        }
        button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        /* Favorites */
        .favorites {
          margin-top: 2rem;
          text-align: left;
        }
        .favorites ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .favorites li {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.5rem 0.75rem;
          border-bottom: 1px solid #e5e7eb;
        }
        .favorites span {
          cursor: pointer;
        }

        /* === 📱 Mobile (up to 640px) === */
        @media (max-width: 640px) {
          .container {
            margin: 1.5rem auto;
            padding: 0.75rem;
          }

          h1 {
            font-size: 1.6rem;
          }

          .form {
            flex-direction: column;
            align-items: stretch;
          }

          input {
            max-width: 100%;
          }

          button {
            width: 100%;
          }

          .favorites li {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
          }
        }

        /* === 📱+ Tablets (641px – 1024px) === */
        @media (min-width: 641px) and (max-width: 1024px) {
          .container {
            max-width: 600px;
            padding: 1rem;
          }

          h1 {
            font-size: 1.8rem;
          }

          .form {
            flex-wrap: nowrap;
          }

          input {
            max-width: 300px;
          }
        }

        /* === 💻 Laptops (1025px – 1440px) === */
        @media (min-width: 1025px) and (max-width: 1440px) {
          .container {
            max-width: 900px;
          }

          h1 {
            font-size: 2rem;
          }

          input {
            max-width: 350px;
          }
        }

        /* === 🖥 Large Desktop (1441px+) === */
        @media (min-width: 1441px) {
          .container {
            max-width: 1100px;
          }

          h1 {
            font-size: 2.4rem;
          }

          input {
            max-width: 400px;
          }
        }

      `}</style>
    </main>
  );
};

export default Page;
