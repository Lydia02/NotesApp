# Note Api
An API that shows the notes created by different authenticated users. 

## Built with
- Javascript
- Node.Js
- MONGODB
- Express.Js


## Table of Contents
- Prerequisites
- Requirements
- Setup
- Base URL
- Models
- Endpoints
- Tests on all endpoints
- License
- Author

## Prerequisites
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)

## Requirements
- User should be able to resgister, login.
- Authenticated users should be able to generate token and create notes.
- Using JWT as authentication strategy, token generated should expire after 1 hour.
- Notes created should be in two state; **public and private**.
- The owner of note should be able to edit,delete, change the state of the note.
- unauthenticated users should be able to read public notes.


## Setup
- Install Nodejs,mongodb
- Pull this repo
- run `npm install`
- update .env with yours
- run `npm dev`

## Base URL
localhost:process.env.PORT || [NoteAPI](https://notesapi-2d5g.onrender.com/notes)

## Models
## Users

### User signup details

| field | data_type| constraints  |
| :---:   | :---: | :---: |
| email | String   | required, unique=true |
| password | String | required |
| firstname | String | required |
| lastname | String |required |

### User login details
| field | data_type |
| :---:   | :---: | 
| email | String  |
| password | String |

## Note model

| field | data_type| constraints  |
| :---:   | :---: | :---: |
| title | String   | required, unique=true |
| description | String | optional |
| author | ObjectId | optional |
| accessControl | String |default, enum |
| read_count | Number   | default |
| reading_time | String | optional |
| body | String | required,  unique=true |
| timestamp | String |optional |

# Endpoints

### Signup
- **Route**: /signup
- **Method**: POST
- Body: 

```
{
  "email": "shubbyboo@gmail.com",
  "password": "****",
  "firstname": "boo",
  "lastname": "shubby"
}

```

- **Response**

```
{
  "message": "Signup successful",
  "user": {
    "firstname": "boo",
    "lastname": "shubby",
    "password": "$2b$10$nOJ.ILgacXMdTq42ZbJQnO7JHpIr09AArmvnYUkIhLWx2g.shFI76",
    "email": "shubbyboo@gmail.com",
    "notes": [],
    "_id": "63f0f1d7b9eebcdf01917485",
    "__v": 0
  }
}
```
### Login
- **Route**: /login
- **Method**: POST
- **Body**: 
```
{
  "email": "shubbyboo@gmail.com",
  "password": "***"
 }
 ```
 - **Response**
 ```
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYzZjBmMWQ3YjllZWJjZGYwMTkxNzQ4NSIsImVtYWlsIjoic2h1YmJ5Ym9vQGdtYWlsLmNvbSJ9LCJpYXQiOjE2NzY3MzUyNTAsImV4cCI6MTY3NjczODg1MH0.w0XCnGoLf7Tyw2cCDVvO4H4Tp_xXyoFkzyzAvQqxhSM"
}
```
# Test all endpoints

### Create article by auntenticated Users

- **Route**: /note
- **Method**: POST
- **Header**: Authorization: Bearer {token}
- **Body**:

```
  {
  "title":"Self Development-0001",
  "description":"Growth and Develoment",
  "tag":"Sdev1",
  "body":"Contenntsksksddmdmfnvbgfdmsk"
}
```
- **Response**
```
{
  "status": true,
  "data": {
    "title": "Self Development-0001",
    "description": "Growth and Develoment",
    "body": "Contenntsksksddmdmfnvbgfdmsk",
    "owner": "63f0f1d7b9eebcdf01917485",
    "accessControl": "private",
    "read_count": 0,
    "reading_time": 1,
    "_id": "63f0f53ac7f3b4da754177f4",
    "createdAt": "2023-02-18T15:56:42.425Z",
    "updatedAt": "2023-02-18T15:56:42.425Z",
    "__v": 0
  }
}
```

### Update the accessControl from **private** to **Public**

- **Route**: /note/:id
- **Method**: PATCH
- **Header**: Authorization: Bearer {token}
- **Body**:

```
{
       "accessControl": "public"
}
```
- **Responses**
```
{
  "status": true,
  "data": {
    "title": "Self Development-0001",
    "description": "Growth and Develoment",
    "body": "Contenntsksksddmdmfnvbgfdmsk",
    "owner": "63f0f1d7b9eebcdf01917485",
    "accessControl": "public",
    "read_count": 0,
    "reading_time": 1,
    "_id": "63f0f53ac7f3b4da754177f4",
    "createdAt": "2023-02-18T15:56:42.425Z",
    "updatedAt": "2023-02-18T15:56:42.425Z",
    "__v": 0
  }
}
```
### Update made by the autheticated user

- **Route**: /note/:id
- **Method**: PATCH
- **Header**: Authorization: Bearer {token}
- **Body**:

```
{
  "status": true,
  "message": "Note updated successfully",
  "note": {
    "_id": "63f0f53ac7f3b4da754177f4",
    "title": "Self Development-0001",
    "description": "Growth and Develoment",
    "body": "Contenntsksksddmdmfnvbgfdmsk",
    "owner": "63f0f1d7b9eebcdf01917485",
    "accessControl": "public",
    "read_count": 0,
    "reading_time": 1,
    "createdAt": "2023-02-18T15:56:42.425Z",
    "updatedAt": "2023-02-18T16:03:02.975Z",
    "__v": 0
  }
}
```

### Get **public** article by authenticated user

- **Route**: /note/:id
- **Method**: GET
- **Header**: Authorization: Bearer {token}
- Resposes:
```
{
  "success": true,
  "message": "Public Note found!",
  "note": [
    {
      "_id": "63f0d8d4104090e0d92861c3",
      "title": "Development",
      "description": "About",
      "body": "Helllooo",
      "owner": "63f0d097b8118622f0f11011",
      "accessControl": "public",
      "read_count": 0,
      "reading_time": 1,
      "createdAt": "2023-02-18T13:55:32.907Z",
      "updatedAt": "2023-02-18T14:17:16.632Z",
      "__v": 0
    },
    {
      "_id": "63f0e1e8521fa4323bd0a9ec",
      "title": "Growth and Development",
      "description": "About us",
      "body": "Hellloooo",
      "owner": "63f0d778c578ec788fdd7e52",
      "accessControl": "public",
      "read_count": 0,
      "reading_time": 1,
      "createdAt": "2023-02-18T14:34:16.092Z",
      "updatedAt": "2023-02-18T14:35:09.272Z",
      "__v": 0
    },
    {
      "_id": "63f0f53ac7f3b4da754177f4",
      "title": "Self Development-0001",
      "description": "Growth and Develoment",
      "body": "Contenntsksksddmdmfnvbgfdmsk",
      "owner": "63f0f1d7b9eebcdf01917485",
      "accessControl": "public",
      "read_count": 0,
      "reading_time": 1,
      "createdAt": "2023-02-18T15:56:42.425Z",
      "updatedAt": "2023-02-18T16:03:02.975Z",
      "__v": 0
    }
  ]
}
```

### Delete note by owner

- **Route**: /note/:id
- **Method**: DELETE
- **Header**:Authorization: Bearer {token}
- **Responses**:
```
{
  "status": true,
  "note": {
    "acknowledged": true,
    "deletedCount": 1
  }

}
```

# LICENSE

# AUTHOR

Lydia Ojoawo : [@Lydia02](https://github.com/Lydia02)
