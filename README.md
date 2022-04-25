# 🏎 CAR SHOP 🏍

## Description
This is an API that allows to create, read, update and delete (CRUD) cars and motorcycles from a database in MongoDB.
The project has unit and integration tests.

## 🔨 Tools 
* TypeScript/ JavaScript
* NodeJS
* Express/ Router
* MongoDB/ Mongoose
* Mocha/ Chai/ Sinon
* Object-oriented programming (OOP)

## 🟡 Install 
Install all the dependencies
 `npm install`

You will need MongoDB for debugging this project, in case you don't have it on your PC I recommend you to follow this 2 steps in order to use MongoDB with Docker:
  * Download the MongoDB image: 
    `docker pull mongo`
  * Create a container:
    `docker run --name <a-name-you-want> -p 27017:27017 -d mongo`

## 🟢 Endpoints
#### 🛻 Cars
* POST /cars
* GET /cars
* GET /cars/:id
* PUT /cars/:id
* DELETE /cars/:id

#### 🛵 Motorcycle
* POST /motorcycle
* GET /motorcycle
* GET /motorcycle/:id
* PUT /motorcycle/:id
* DELETE /motorcycle/:id
