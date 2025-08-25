const Loader = () => (
  <div aria-live="polite" role="status" className="loader">
    ⏳ Fetching weather...
    <style jsx>{`
      .loader {
        display: inline-block;
        padding: 0.6rem 1.2rem;
        border-radius: 1rem;
        border: 1px solid #e5e7eb;
        background: #f9fafb;
        font-size: 0.95rem;
        font-weight: 500;
        color: #374151;
        animation: pulse 1.5s infinite;
      }
      @keyframes pulse {
        0%, 100% { opacity: 0.6; }
        50% { opacity: 1; }
      }
    `}</style>
  </div>
);

export default Loader;
