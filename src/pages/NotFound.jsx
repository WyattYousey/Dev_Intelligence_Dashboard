import Header from '../components/Header';
import '../components/styles/NotFound.css';

const NotFound = () => {
  return (
    <div className="not_found">
      <Header />

      <div style={{ textAlign: 'center', padding: '50px' }}>
        <h3 className="not_found__title">404 - Page or User Not Found</h3>
        <p className="not_found__message">
          The page or user you are looking for does not exist.
        </p>
      </div>
    </div>
  );
};

export default NotFound;
