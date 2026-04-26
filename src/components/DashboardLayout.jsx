import './styles/DashboardLayout.css';

const DashboardLayout = ({ header, children }) => {
  return (
    <div className="dashboard">
      <div className="dashboard__header">{header}</div>
      <div className="dashboard__grid">{children}</div>
    </div>
  );
};

export default DashboardLayout;
