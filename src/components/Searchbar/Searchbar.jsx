import { Component } from 'react';
import style from './Searchbar.module.css';

export default class Searchbar extends Component {
  state = {
    imageName: '',
  };

  handleImageChange = event => {
    this.setState({ imageName: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = event => {
    event.preventDefault();
    console.log('submit');

    if (this.state.imageName.trim() === '') {
      return alert('Please, enter image name.');
    }

    this.props.onSubmit(this.state.imageName);
    this.setState({ imageName: '' });
  };

  render() {
    return (
      <header className={style.Searchbar}>
        <form className={style.SearchForm} onSubmit={this.handleSubmit}>
          <label>
            <input
              type="text"
              name="image"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
              value={this.state.imageName}
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
