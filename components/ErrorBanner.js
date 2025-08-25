const ErrorBanner = ({ message }) => (
  <div role="alert" className="error">
    ⚠️ {message}
    <style jsx>{`
      .error {
        margin-top: 1rem;
        padding: 0.85rem 1rem;
        border-radius: 0.75rem;
        background: #fef2f2;
        color: #991b1b;
        border: 1px solid #fecaca;
        font-weight: 500;
      }
    `}</style>
  </div>
);

export default ErrorBanner;
