import React, { Component } from 'react';

export default class EditBookmark extends Component {

  componentDidMount() {
    const bookmarkId = this.props.match.params.bookmarkId
    fetch(`https://localhost:8000/api/bookmarks/${bookmarkId}`, {
      method: 'GET'
    })
      .then()
      .then(responseData => {
        this.setState({
          //fields state updates here
        })
      })
      .catch(error => {})
  }
  //state for inputs etc...
  render() {
    const { title, url, description, rating } = this.state
    return (
      <section className="EditBookmarkForm">
        <h2>Edit Bookmark</h2>
        <form>
          <input
            id='title'
            type='text'
            name='title'
            placeholder='Great bookmark'
            required
            value={title}
            onChange={this.handleChangeTitle}
          />
        </form>
      </section>
    )
  }
}