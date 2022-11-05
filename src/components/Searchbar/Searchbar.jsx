import { Component } from 'react';
import style from './Searchbar.module.css';

export default class Searchbar extends Component {
  state = {
    searchImage: '',
    searchPage: 1,
  };

  handleImageChange = event => {
    this.setState({ searchImage: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = event => {
    event.preventDefault();

    if (this.state.searchImage.trim() === '') {
      return alert('Please, enter image name.');
    }

    const { searchImage, searchPage } = this.state;
    this.props.onSubmit(searchImage, searchPage);

    this.setState({ searchImage: '', searchPage: 1 });
  };

  render() {
    return (
      <header className={style.Searchbar}>
        <h1 className="visually-hidden">images gallery</h1>
        <form className={style.SearchForm} onSubmit={this.handleSubmit}>
          <label>
            <input
              type="text"
              name="image"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
              value={this.state.searchImage}
              className={style.SearchForm__input}
              onChange={this.handleImageChange}
            ></input>
          </label>
          <button type="submit" className={style.SearchForm__button}>
            <span className={style.SearchForm__buttonLabel}>Search</span>
          </button>
        </form>
      </header>
    );
  }
}
