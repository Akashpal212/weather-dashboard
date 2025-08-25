const WeatherCard = ({ data }) => {
  const { city, country, temperature, condition, description, humidity, windSpeed, icon } = data;

  const iconUrl = icon ? `https://openweathermap.org/img/wn/${icon}@2x.png` : null;

  return (
    <section aria-label="Current weather" className="card">
      <header className="header">
        <h2>{`${city}${country ? `, ${country}` : ""}`}</h2>
        {iconUrl && <img src={iconUrl} alt={description || "Weather icon"} />}
      </header>

      <div className="details">
        <p><strong>🌡 Temp:</strong> {Math.round(temperature)}°C</p>
        <p><strong>🌥 Condition:</strong> {condition || "—"}</p>
        <p><strong>💧 Humidity:</strong> {humidity ?? "—"}%</p>
        <p><strong>💨 Wind:</strong> {windSpeed ?? "—"} m/s</p>
      </div>

      <style jsx>{`
        .card {
          margin-top: 1.5rem;
          padding: 1.5rem;
          border-radius: 1rem;
          background: white;
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
          transition: transform 0.2s ease-in-out;
        }
        .card:hover {
          transform: translateY(-2px);
        }
        .header {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .header h2 {
          font-size: 1.4rem;
          font-weight: 600;
          color: #111827;
        }
        .details {
          margin-top: 1rem;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 0.75rem;
          font-size: 1rem;
          color: #374151;
        }
      `}</style>
    </section>
  );
};

export default WeatherCard;
