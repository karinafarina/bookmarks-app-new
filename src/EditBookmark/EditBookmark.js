import React, { Component } from 'react';
import PropTypes from 'prop-types';
import config from '../config'
import BookmarksContext from '../BookmarksContext';
import './EditBookmark.css'

const Required = () => (
  <span className='EditBookmark__required'>*</span>
)

export default class EditBookmark extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.object,
    }),
    history: PropTypes.shape({
      push: PropTypes.func,
    }).isRequired,
  };

static contextType = BookmarksContext;

  state = {
    error: null,
    id: '',
    title: '',
    url: '',
    description: '',
    rating: 1,
  };

  componentDidMount() {
    const { bookmarkId } = this.props.match.params
    fetch(config.API_ENDPOINT + `${bookmarkId}`, {
      method: 'GET',
      headers: {
        'authorization':`Bearer ${config.API_KEY}`
      }
    })
      .then(res => {
        if(!res.ok)
          return res.json().then(error => Promise.reject(error)
        )
          
        return res.json()
      })
      .then(responseData => {
        this.setState({
          id: responseData.id,
          title: responseData.title,
          url: responseData.url,
          description: responseData.description,
          rating: responseData.rating,
        })
      })
      .catch(error => {
        console.log(error)
        this.setState({ error })
      })
  }

  handleChangeTitle = e => {
    this.setState({ title: e.target.value })
  }

  handleChangeUrl = e => {
    this.setState({ url: e.target.value })
  }

  handleChangeDescription = e => {
    this.setState({ description: e.target.value })
  }

  handleChangeRating = e => {
    this.setState({ rating: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault()
    const { bookmarkId } = this.props.match.params
    const { id, title, url, description, rating } = this.state
    const newBookmark = { id, title, url, description, rating }
 
    fetch(config.API_ENDPOINT + `${bookmarkId}`, {
      method: 'PATCH',
      body: JSON.stringify(newBookmark),
      headers: {
        'content-type': 'application/json',
        'authorization': `Bearer ${config.API_KEY}`
      },
    })
    .then(res => {
      if(!res.ok)
        return res.json().then(error => Promise.reject(error))
    })
    .then(responseData => {
      console.log('response data: ', responseData)
      this.context.updateBookmark(responseData)
    })
    .catch(error => {
      console.error(error)
      this.setState({ error })
  })
}

  render() {
    const { title, url, description, rating } = this.state
    return (
      <section className="EditBookmarkForm">
        <h2>Edit Bookmark</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor='title'>
              Title
                {' '}
              <Required />
            </label>
            <input
              type='text'
              name='title'
              id='title'
              placeholder='Great website!'
              required
              value={title}
              onChange={this.handleChangeTitle}
            />
          </div>
          <div>
            <label htmlFor='url'>
              URL
                {' '}
              <Required />
            </label>
            <input
              type='url'
              name='url'
              id='url'
              placeholder='https://www.great-website.com/'
              required
              value={url}
              onChange={this.handleChangeUrl}
            />
          </div>
          <div>
            <label htmlFor='description'>
              Description
              </label>
            <textarea
              name='description'
              id='description'
              value={description}
              onChange={this.handleChangeDescription}
            />
          </div>
          <div>
            <label htmlFor='rating'>
              Rating
                {' '}
              <Required />
            </label>
            <input
              type='number'
              name='rating'
              id='rating'
              min='1'
              max='5'
              required
              value={rating}
              onChange={this.handleChangeRating}
            />
          </div>
        </form>
      </section>
    )
  }
}