import './styles/DashboardWidget.css';

const DashboardWidget = ({title, children}) => {
  return (
      <div className="widget">
          <h2 className="widget__title">{title}</h2>
          <div className="widget__content">{children}</div>
    </div>
  )
}

export default DashboardWidget