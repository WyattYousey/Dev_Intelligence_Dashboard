import { useEffect } from 'react';
import { UI } from '../config/constants';
import './styles/ErrorBanner.css';

const ErrorBanner = ({ message, onClose, duration = UI.ERROR_DURATION }) => {
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
