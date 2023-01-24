import './index.css'

const LanguageFilterItem = props => {
  const {languageDetails, isActive, onChangeLanguage} = props
  const {language, id} = languageDetails

  const activeItemClass = isActive ? 'active-item' : ''

  const changeLanguage = () => {
    onChangeLanguage(id)
  }

  return (
    <li className={`filter-item ${activeItemClass}`}>
      <button type="button" className="normal-btn" onClick={changeLanguage}>
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
