import './styles/PrimaryLanguage.css';

const PrimaryLanguage = ({ primaryLanguage, primaryLanguagePercentage }) => {
  return (
    <div className="primary_language">
      <span className="primary_language__percentage">
        {primaryLanguagePercentage}%
      </span>
      <p className="primary_language__name">{primaryLanguage}</p>
    </div>
  );
};

export default PrimaryLanguage;
