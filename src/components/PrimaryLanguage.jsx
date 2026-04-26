import './styles/PrimaryLanguage.css';

const PrimaryLanguage = ({ repo, languageData }) => {
  if (!languageData) return null;

  const languageMax = Object.values(languageData).reduce(
    (sum, value) => sum + value,
    0
  );
  const primaryLanguagePercentage = Math.floor(
    (languageData[repo.language] / languageMax) * 100
  );
  return (
    <div className="primary_language">
      <span className="primary_language__percentage">
        {primaryLanguagePercentage}%
      </span>
      <p className="primary_language__name">{repo.language}</p>
    </div>
  );
};

export default PrimaryLanguage;
