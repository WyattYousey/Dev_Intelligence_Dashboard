import './styles/DashboardWidget.css';

const DashboardWidget = ({title, children}) => {
  return (
      <div className="widget">
          <div className="widget__title">{title}</div>
          <div className="widget__content">{children}</div>
    </div>
  )
}

export default DashboardWidget