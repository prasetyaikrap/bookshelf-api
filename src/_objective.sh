Bookshelf API
#1 Menyimpan Buku [SUCCESS]
1a. Request Body :
{
    "name": string,
    "year": number,
    "author": string,
    "summary": string,
    "publisher": string,
    "pageCount": number,
    "readPage": number,
    "reading": boolean
}

1b. Object Stored :
{
    "id": "Qbax5Oy7L8WKf74l",
    "name": "Buku A",
    "year": 2010,
    "author": "John Doe",
    "summary": "Lorem ipsum dolor sit amet",
    "publisher": "Dicoding Indonesia",
    "pageCount": 100,
    "readPage": 25,
    "finished": false,
    "reading": false,
    "insertedAt": "2021-03-04T09:11:44.598Z",
    "updatedAt": "2021-03-04T09:11:44.598Z"
}

1c. Response Status
Gagal:
- Jika tidak melampirkan properti 'name' pada Request Body (code: 400)
Response:
{
    status: 'fail',
    message: 'Gagal menambahkan buku. Mohon isi nama buku'
}
- jika properti 'readPage' nilainya lebih besar dari 'pageCount' (code: 400)
response:
{
    status: 'fail',
    message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
}
- Generic fail
response:
{
    status: 'fail',
    message: 'Buku gagal ditambahkan'
}

Success
-Jika semua field diisi dan berhasil ditambhkan pada database (code: 201)
Response:
{
    status: 'success',
    message: 'Buku berhasil ditambahkan'
    data: {
        bookId: id
    }
}

#2 Menampilkan List Buku
2a Response Body (code: 200)
{
    "status": "success",
    "data": {
        "books": [
            {
                "id": "Qbax5Oy7L8WKf74l",
                "name": "Buku A",
                "publisher": "Dicoding Indonesia"
            },
            {
                "id": "1L7ZtDUFeGs7VlEt",
                "name": "Buku B",
                "publisher": "Dicoding Indonesia"
            },
            {
                "id": "K8DZbfI-t3LrY7lD",
                "name": "Buku C",
                "publisher": "Dicoding Indonesia"
            }
        ]
    }
}