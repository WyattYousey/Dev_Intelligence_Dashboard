const MetaGrid = ({ data }) => {
  return (
    <div className="meta-grid">
      {Object.entries(data).map(([key, value]) => (
        <div key={key}>
          <span>{key}</span>
          <strong>{value}</strong>
        </div>
      ))}
    </div>
  );
}

export default MetaGrid