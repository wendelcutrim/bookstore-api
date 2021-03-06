# bookstore-api

## About the project:

Project created to practice my studies about how create REST APIs.
[![GitHub license](https://img.shields.io/github/license/wendelcutrim/bookstore-api)](https://github.com/wendelcutrim/bookstore-api)
[![GitHub issues](https://img.shields.io/github/issues/wendelcutrim/bookstore-api)](https://github.com/wendelcutrim/bookstore-api/issues)

## Tech Stack

**Server:** Node.js, Javascript, Express, MySQL, Sequelize

## Environment variables
⚙️ Set the environment variables to the Sequelize communicate with the database server
````properties
DBUSER=
DBNAME=
DBPASS=
DBHOST= localhost
DBDIALECT= mysql
````
## How to run the project:

Install all the dependecies:
````bash
npm install
````
💡 Turn on the MySQL server 

Create the database with the `sequelize`
````bash
npx sequelize db:create
````
Create the database table with the sequelize
````bash
npx sequelize db:migrate
````
Run all the seeders to seed the database book table
````bash
npx sequelize db:seed:all
````
After install all the dependecies, create the database, database table and run all the seeders, we can start the server
````bash
npm start
````

## API Reference
```http
/bookstore/api/v1
```
#### Return all the books

```http
  GET /bookstore/api/v1/books
```

#### Get a book by id

```http
  GET /bookstore/api/v1/books/{id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

#### Create a new book

```http
  POST /bookstore/api/v1/books
```

| Parameter             | Type      | Description  |
| :-------------------- | :-------  | :------------|
| `title`               | `string`  | **Required** |
| `total_pages`         | `integer` | **Required** |
| `author`              | `string`  | **Required** |
| `release_year`        | `string`  | **Required** |
| `stock`               | `integer` | **Required** |

#### Update a existing book

```http
  PUT /bookstore/api/v1/books/{id}
```
| Parameter             | Type      |
| :-------------------- | :-------  |
| `title`               | `string`  |
| `total_pages`         | `integer` |
| `author`              | `string`  |
| `release_year`        | `string`  |
| `stock`               | `integer` |

#### Destroy a existing book
```http
  DELETE /bookstore/api/v1/books/{id}
```


### Sucess code:
- 200: Ok
- 201: Created
### Errors code:
- 400: Bad request
- 404: Not found
- 422: Unprocessable entity
- 500: Internal server error