import './styles/Activity.css';

const Activity = ({ daysSinceUpdate }) => {
  return (
    <div className="activity">
      <p className="activity__banner">
        {daysSinceUpdate < 30 ? '🟢 Active' : '⚪ Stale'}
      </p>
      <span>{Math.floor(daysSinceUpdate)} days ago</span>
    </div>
  );
};

export default Activity;
