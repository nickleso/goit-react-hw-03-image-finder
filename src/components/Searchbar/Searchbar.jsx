import { Component } from 'react';
import { FcSearch } from 'react-icons/fc';
import style from './Searchbar.module.css';

export default class Searchbar extends Component {
  state = {
    searchImage: '',
  };

  handleImageChange = event => {
    this.setState({ searchImage: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = event => {
    event.preventDefault();

    if (this.state.searchImage.trim() === '') {
      return alert('Please, enter image name.');
    }

    this.props.onSubmit(this.state.searchImage);

    this.setState({ searchImage: '' });
  };

  render() {
    return (
      <header className={style.Searchbar}>
        <h1 className="visually-hidden">images gallery</h1>
        <form className={style.SearchForm} onSubmit={this.handleSubmit}>
          <label htmlFor="searchInput"></label>
          <input
            id="searchInput"
            type="text"
            name="image"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.searchImage}
            className={style.SearchForm__input}
            onChange={this.handleImageChange}
          ></input>
          <button type="submit" className={style.SearchForm__button}>
            <FcSearch size={30} />
            <span className={style.SearchForm__buttonLabel}>Search</span>
          </button>
        </form>
      </header>
    );
  }
}
