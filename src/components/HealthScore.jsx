import './styles/HealthScore.css';

const HealthScore = ({ score }) => {
  return (
    <div className="health">
      <span className="health__score">{score}%</span>
    </div>
  );
};

export default HealthScore;
