import './styles/DashboardWidget.css';

const DashboardWidget = ({ type = 'default', size = 'medium', title, children, className }) => {
  return (
    <section className={`widget widget_${size}_${type} ${className || ''}`}>
      <h2 className="widget__title">{title}</h2>
      <div className="widget__content">{children}</div>
    </section>
  );
};

export default DashboardWidget