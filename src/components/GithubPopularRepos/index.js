import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'

import './index.css'
import RepositoryItem from '../RepositoryItem'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const apiStatusConstants = {
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class GithubPopularRepos extends Component {
  state = {
    activeFilterItemId: languageFiltersData[0].id,
    apiStatus: '',
    reposList: [],
  }

  componentDidMount() {
    this.getRepositoryList()
  }

  getRepositoryList = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {activeFilterItemId} = this.state
    const githubReposApiUrl = `https://apis.ccbp.in/popular-repos?language=${activeFilterItemId}`

    const response = await fetch(githubReposApiUrl)
    const data = await response.json()
    if (response.ok) {
      const fetchedList = data.popular_repos
      const updatedReposList = fetchedList.map(repo => ({
        name: repo.name,
        id: repo.id,
        issuesCount: repo.issues_count,
        forksCount: repo.forks_count,
        starsCount: repo.stars_count,
        avatarUrl: repo.avatar_url,
      }))
      this.setState({
        reposList: updatedReposList,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onChangeLanguage = id => {
    this.setState({activeFilterItemId: id}, this.getRepositoryList)
  }

  renderingLoadingView = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderingSuccessView = () => {
    const {reposList} = this.state
    return (
      <ul className="repository-items-list">
        {reposList.map(eachRepo => (
          <RepositoryItem itemDetails={eachRepo} key={eachRepo.id} />
        ))}
      </ul>
    )
  }

  renderingFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-img"
      />
      <h1 className="failure-heading">Something went wrong</h1>
    </div>
  )

  renderingViews = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderingLoadingView()
      case apiStatusConstants.success:
        return this.renderingSuccessView()
      case apiStatusConstants.failure:
        return this.renderingFailureView()
      default:
        return null
    }
  }

  render() {
    const {activeFilterItemId} = this.state
    return (
      <div className="github-popular-repos-container">
        <h1 className="popular-heading">Popular</h1>
        <ul className="filters-list">
          {languageFiltersData.map(eachLanguage => (
            <LanguageFilterItem
              languageDetails={eachLanguage}
              isActive={eachLanguage.id === activeFilterItemId}
              key={eachLanguage.id}
              onChangeLanguage={this.onChangeLanguage}
            />
          ))}
        </ul>
        {this.renderingViews()}
      </div>
    )
  }
}

export default GithubPopularRepos
