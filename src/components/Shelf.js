import React from "react";
import Book from "./Book";

const Bookshelf = ({ shelftitle, books, renewBook }) => {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{shelftitle}</h2>
      <div className="bookshself-books">
        <ol className="books-grid">
          {books.map((book, key) => (
            <Book renewBook={renewBook} book={book} key={key} />
          ))}
        </ol>
      </div>
    </div>
  );
};

export default Bookshelf;
