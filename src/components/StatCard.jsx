import './styles/StatCard.css';

const StatCard = ({ label, value }) => {
    return <div className="stat">
        <p className="stat__label">{label}</p>
        <span className="stat__value">{value}</span>
  </div>;
};

export default StatCard;
