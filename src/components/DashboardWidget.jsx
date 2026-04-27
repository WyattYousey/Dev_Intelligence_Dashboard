import './styles/DashboardWidget.css';

const DashboardWidget = ({ size = 'medium', title, children, className }) => {
  return (
    <section className={`widget widget_${size}${className ? className : ''} ${className || ''}`}>
      <h2 className="widget__title">{title}</h2>
      <div className="widget__content">{children}</div>
    </section>
  );
};

export default DashboardWidget