import './index.css'

const RepositoryItem = props => {
  const {itemDetails} = props
  const {name, avatarUrl, starsCount, issuesCount, forksCount} = itemDetails
  return (
    <li className="repo-item">
      <img src={avatarUrl} alt={name} className="avatar" />
      <h1 className="name">{name}</h1>
      <div className="issue-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="repo-icon"
        />
        <p className="count">{starsCount} stars</p>
      </div>
      <div className="issue-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
          className="repo-icon"
        />
        <p className="count">{forksCount} forks</p>
      </div>
      <div className="issue-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
          className="repo-icon"
        />
        <p className="count">{issuesCount} open issues</p>
      </div>
    </li>
  )
}

export default RepositoryItem
