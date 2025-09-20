// src/pages/Search.js
import React, { useState } from "react";
import "../App.css";
import "./search.css";

function Search() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);

  const searchBooks = async () => {
    if (!query) return;
    try {
      const res = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${query}`
      );
      const data = await res.json();
      setBooks(data.items || []);
    } catch (err) {
      console.error("Error fetching books:", err);
    }
  };

  return (
    <div className="search-container">
      <div className="overlay">
        <div className="container my-5">
          <h1 className="text-center text-light mb-4">Search Books</h1>

          {/* Search Box */}
          <div className="d-flex justify-content-center mb-4">
            <input
              type="text"
              className="form-control w-50 me-2"
              placeholder="Search for books by title or author..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button className="btn btn-primary" onClick={searchBooks}>
              Search
            </button>
          </div>

          {/* Books Display */}
          <div className="row">
            {books.map((book) => {
              const info = book.volumeInfo;
              return (
                <div className="col-md-3 mb-4" key={book.id}>
                  <div className="card book-card h-100 shadow-sm">
                    <img
                      src={
                        info.imageLinks?.thumbnail ||
                        "https://via.placeholder.com/150"
                      }
                      className="card-img-top"
                      alt={info.title}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{info.title}</h5>
                      <p className="card-text">
                        {info.authors ? info.authors.join(", ") : "Unknown Author"}
                      </p>
                      <button
                        className="btn btn-outline-primary"
                        onClick={() => setSelectedBook(info)}
                      >
                        Read More
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Modal */}
          {selectedBook && (
            <div
              className="modal fade show"
              style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
            >
              <div className="modal-dialog modal-lg">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">{selectedBook.title}</h5>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={() => setSelectedBook(null)}
                    ></button>
                  </div>
                  <div className="modal-body d-flex">
                    <img
                      src={
                        selectedBook.imageLinks?.thumbnail ||
                        "https://via.placeholder.com/150"
                      }
                      alt={selectedBook.title}
                      className="me-3"
                      style={{ height: "250px" }}
                    />
                    <div>
                      <p>
                        <strong>Authors:</strong>{" "}
                        {selectedBook.authors
                          ? selectedBook.authors.join(", ")
                          : "Unknown"}
                      </p>
                      <p>
                        <strong>Publisher:</strong>{" "}
                        {selectedBook.publisher || "N/A"}
                      </p>
                      <p>
                        <strong>Published Date:</strong>{" "}
                        {selectedBook.publishedDate || "N/A"}
                      </p>
                      <p>{selectedBook.description || "No description available."}</p>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <a
                      href={selectedBook.infoLink}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-primary"
                    >
                      View on Google Books
                    </a>
                    <button
                      className="btn btn-secondary"
                      onClick={() => setSelectedBook(null)}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Search;
