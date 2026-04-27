import './styles/DashboardLayout.css';

const DashboardLayout = ({ type, children }) => {
  return (
    <div className="dashboard">
      <div className={`dashboard__grid dashboard__grid_${type || 'default'}`}>{children}</div>
    </div>
  );
};

export default DashboardLayout;
