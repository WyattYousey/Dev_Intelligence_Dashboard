import './styles/DashboardLayout.css';

const DashboardLayout = ({ children }) => {
  return (
    <div className="dashboard">
      <div className="dashboard__grid">{children}</div>
    </div>
  );
};

export default DashboardLayout;
