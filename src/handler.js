import { nanoid } from "nanoid";
import { books } from "./books.js";

export const addBooksHandler = (req, h) => {
  //Test
  //return h.response("API Active").code(201);

  //Variable for Stored Object
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = req.payload;

  const finished = pageCount === readPage ? true : false;
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  const id = nanoid(16);
  //Created Book Object from Variable
  const newBooks = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
    finished,
    insertedAt,
    updatedAt,
  };
  let result = "";
  //Check if the required field is exist
  switch (true) {
    case newBooks.name?.length <= 0 || newBooks.name === undefined:
      result = h
        .response({
          status: "fail",
          message: "Gagal menambahkan buku. Mohon isi nama buku",
        })
        .code(400);
      break;
    case newBooks.readPage > newBooks.pageCount:
      result = h
        .response({
          status: "fail",
          message:
            "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
        })
        .code(400);
      break;
    case newBooks.id.length > 0 &&
      newBooks.name?.length > 0 &&
      newBooks.name !== undefined &&
      newBooks.readPage <= newBooks.pageCount:
      books.push(newBooks);
      const isSuccess = books.filter((book) => book.id === id).length > 0;
      if (isSuccess) {
        result = h
          .response({
            status: "success",
            message: "Buku berhasil ditambahkan",
            data: {
              bookId: newBooks.id,
            },
          })
          .code(201);
      } else {
        result = h
          .response({
            status: "fail",
            message: "Buku gagal ditambahkan",
          })
          .code(500);
      }
      break;
    default:
  }
  return result;
};

export const getAllBooksHandler = (req, h) => {
  //Get Query from Request
  const { reading, finished, name } = req.query;
  //Response Result
  let booksData = [];
  //Condition
  switch (true) {
    case reading === undefined && finished === undefined && name === undefined:
      booksData = books.map((book) => {
        const list = {};
        list.id = book.id;
        list.name = book.name;
        list.publisher = book.publisher;
        return list;
      });
      break;
    case reading !== undefined:
      const isReading = reading === "1" ? true : false;
      booksData = books
        .filter((book) => book.reading === isReading)
        .map((book) => {
          const list = {};
          list.id = book.id;
          list.name = book.name;
          list.publisher = book.publisher;
          return list;
        });
      break;
    case finished !== undefined:
      const isFinished = finished === "1" ? true : false;
      booksData = books
        .filter((book) => book.finished === isFinished)
        .map((book) => {
          const list = {};
          list.id = book.id;
          list.name = book.name;
          list.publisher = book.publisher;
          return list;
        });
      break;
    case name !== undefined:
      booksData = books
        .filter((book) => book.name.toLowerCase().includes("dicoding"))
        .map((book) => {
          const list = {};
          list.id = book.id;
          list.name = book.name;
          list.publisher = book.publisher;
          return list;
        });
      break;
    default:
  }
  return h
    .response({
      status: "success",
      data: {
        books: booksData,
      },
    })
    .code(200);
};

export const getDetailBook = (req, h) => {
  const { bookId } = req.params;
  let result = "";
  //Search request ID
  const bookData = books.filter((book) => {
    return book.id === bookId;
  });
  if (bookData.length === 1) {
    result = h
      .response({
        status: "success",
        data: {
          book: bookData[0],
        },
      })
      .code(200);
  } else {
    result = h
      .response({
        status: "fail",
        message: "Buku tidak ditemukan",
      })
      .code(404);
  }
  return result;
};

export const modBookById = (req, h) => {
  //Request Body and Variable
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = req.payload;
  const finished = pageCount === readPage ? true : false;
  const updatedAt = new Date().toISOString();
  //Result for Response
  let result = "";
  //Find Book by ID
  const { bookId } = req.params;
  const bookIndex = books.findIndex((book) => book.id === bookId);

  switch (true) {
    case name?.length <= 0 || name === undefined:
      result = h
        .response({
          status: "fail",
          message: "Gagal memperbarui buku. Mohon isi nama buku",
        })
        .code(400);
      break;
    case readPage > pageCount:
      result = h
        .response({
          status: "fail",
          message:
            "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
        })
        .code(400);
      break;
    case bookIndex === -1:
      result = h
        .response({
          status: "fail",
          message: "Gagal memperbarui buku. Id tidak ditemukan",
        })
        .code(404);
      break;
    default:
      //Update data
      books[bookIndex] = {
        ...books[bookIndex],
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
        finished,
        updatedAt,
      };
      result = h
        .response({
          status: "success",
          message: "Buku berhasil diperbarui",
        })
        .code(200);
  }
  return result;
};

export const deleteBookById = (req, h) => {
  //Get Book by ID
  const { bookId } = req.params;
  const bookIndex = books.findIndex((book) => book.id === bookId);
  //Condition
  let result = "";
  if (bookIndex === -1) {
    result = h
      .response({
        status: "fail",
        message: "Buku gagal dihapus. Id tidak ditemukan",
      })
      .code(404);
  } else {
    books.splice(bookIndex, 1);
    const isDeleted = books.findIndex((book) => book.id === bookId) === -1;
    if (isDeleted) {
      result = h
        .response({
          status: "success",
          message: "Buku berhasil dihapus",
        })
        .code(200);
    } else {
      result = h
        .response({
          status: "Error",
          message: "Terjadi Kesalahan. Silahkan Ulangi Prosedur",
        })
        .code(400);
    }
  }
  return result;
};
