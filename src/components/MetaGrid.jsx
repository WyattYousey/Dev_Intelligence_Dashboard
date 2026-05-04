import './styles/MetaGrid.css';

const MetaGrid = ({ data }) => {
  return (
    <div className="meta_grid">
      {data.map(({ label, value }) => (
        <div key={label} className="meta_grid__item">
          <span className="meta_grid__item_label">{label}:</span>
          <strong className="meta_grid__item_value">{value}</strong>
        </div>
      ))}
    </div>
  );
};

export default MetaGrid;
