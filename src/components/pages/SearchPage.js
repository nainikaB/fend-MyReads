import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "../../BooksAPI";
import Book from "../Book";

class SearchPage extends Component {
  state = {
    books: [],
    solution: [],
    query: ""
  };

  renewQuery = query => {
    if (!query) {
      this.setState(() => ({
        query: "",
        books: []
      }));
    } else {
      this.setState(() => ({
        query
      }));

      BooksAPI.search(query).then(reply => {
        if (reply.error) {
          return this.setState({ solution: [] });
        } else {
          reply.map(book =>
            this.state.books
              .filter(b => b.id === book.id)
              .map(b => (book.shelf = b.shelf))
          );
          return this.setState({ solution: reply });
        }
      });
    }
  };

  render() {
    const { query, solution } = this.state;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={event => this.renewQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {solution.map(book => {
              let bookToSend;
              this.props.currentBooks.forEach(curr =>
                curr.id === book.id ? (bookToSend = curr) : null
              );
              return (
                <li key={book.id}>
                  <Book
                    currentBooks={this.props.currentBooks}
                    book={bookToSend || book}
                    renewBook={this.props.renewBook}
                  />
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchPage;
