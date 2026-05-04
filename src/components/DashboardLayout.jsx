import './styles/DashboardLayout.css';

const DashboardLayout = ({ type, children, mobileWithReadme }) => {
  const gridClass = mobileWithReadme
    ? `dashboard__grid_${type || 'default'}_mobile`
    : `dashboard__grid_${type || 'default'}`;

  return (
    <div className="dashboard">
      <div className={`dashboard__grid ${gridClass}`}>{children}</div>
    </div>
  );
};

export default DashboardLayout;
