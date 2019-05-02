import React from "react";
import "./App.css";
import { Route } from "react-router-dom";
import MainPage from "../pages/MainPage";
import SearchPage from "../pages/SearchPage";
import * as BooksAPI from "../../BooksAPI";
class BooksApp extends React.Component {
  state = {
    books: []
  };

  renewBook = (book, shelf) => {
    BooksAPI.update(book, shelf).then(response => {
      this.BooksToShelf();
    });
  };

  BooksToShelf() {
    this.getDataFromDB();
  }

  getDataFromDB() {
    BooksAPI.getAll().then(data => {
      this.setState({
        books: data
      });
    });
  }

  componentDidMount() {
    this.getDataFromDB();
  }
  
  render() {
    return (
      <div>
        <Route
          exact
          path="/"
          render={() => (
            <MainPage
              books={this.state.books}
              shelfInfoHandler={this.shelfInfoHandler}
              renewBook={this.renewBook}
            />
          )}
        />
        <Route
          exact
          path="/search"
          render={() => (
            <SearchPage
              currentBooks={this.state.books}
              renewBook={this.renewBook}
            />
          )}
        />
      </div>
    );
  }
}
export default BooksApp;
