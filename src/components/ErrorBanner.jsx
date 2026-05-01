import { useEffect } from 'react';
import './styles/ErrorBanner.css';

const ErrorBanner = ({ message, onClose, duration = 5000 }) => {
  useEffect(() => {
    if (!message) return;

    const timer = setTimeout(() => {
      onClose?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [message, duration, onClose]);

  if (!message) return null;
  return (
    <div role="alert" aria-live="assertive" className={'error-banner show'}>
      <span>{message}</span>
      <button className="error-banner__close-btn" onClick={onClose}>
        ✕
      </button>
    </div>
  );
};

export default ErrorBanner;
