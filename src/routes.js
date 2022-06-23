import {
  addBooksHandler,
  getAllBooksHandler,
  getDetailBook,
  modBookById,
  deleteBookById,
} from "./handler.js";

export const routes = [
  {
    method: "POST",
    path: "/books",
    handler: addBooksHandler,
  },
  {
    method: "GET",
    path: "/books",
    handler: getAllBooksHandler,
  },
  {
    method: "GET",
    path: "/books/{bookId}",
    handler: getDetailBook,
  },
  {
    method: "PUT",
    path: "/books/{bookId}",
    handler: modBookById,
  },
  {
    method: "DELETE",
    path: "/books/{bookId}",
    handler: deleteBookById,
  },
];
