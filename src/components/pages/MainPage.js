import React from "react";
import { Link } from "react-router-dom";


import Bookshelf from "../Shelf";

class MainPage extends React.Component {
  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          {["currentlyReading", "wantToRead", "read"].map(shelfType => (
            <Bookshelf
              key={shelfType}
              books={this.props.books.filter(book => book.shelf === shelfType)}
              renewBook={this.props.renewBook}
              shelftitle={shelfType
                .split(/(?=[A-Z])/)
                .map(str => str[0].toUpperCase() + str.slice(1))
                .join(" ")}
            />
          ))}
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    );
  }
}

export default MainPage;
