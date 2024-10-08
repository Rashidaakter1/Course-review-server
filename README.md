
# Course Review Server

## Objective

Develop a Node.js Express application using TypeScript as the programming language, integrating MongoDB with Mongoose for user data and order management. Ensure data integrity through validation using Zod.

## Links

- [Course-review-server](https://course-review-server-o92qcqcco.vercel.app/)

- [Testing video with Postman](https://www.youtube.com/watch?v=ZJdK9FxVXXo)


## Tech Stack

**Server:** 
Node.js, MongoDB, TypeScript, Mongoose




## Run Locally

Clone the project

```bash
  git clone https://github.com/Rashidaakter1/Course-review-server.git
```

Go to the project directory

```bash
  cd Course-review-server
```

Install dependencies

```bash
  npm install
```

Start the server with development

```bash
  npm run start:dev
```


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT=5000`

`NODE__DEV=production`

`DATABASE__URL=<your-mongodb-connection-string>`


## Data Models
###  Course Model

The Course model is defined using Mongoose and includes the following fields:

- _id (Object ID): A distinctive identifier generated by MongoDB.
- title (String): A unique title of the course.
- instructor (String): The instructor of the course.
- categoryId (Object ID): A reference to the category collection.
- price (Number): The price of the course.
- tags(Array of Object): The "tags" field is an array of objects, each having a "name" (string) and "isDeleted" (boolean) property.
- startDate (String): The start date of the course.
- endDate (String): The end date of the course.
- language (String): The language in which the course is conducted.
- provider (String): The provider of the course.
- durationInWeeks (Integer): This represents the course's overall duration in weeks,     calculated by applying the ceil function to the numeric value derived from the start and  end dates. The resulting number is rounded up to the nearest integer, ensuring that the duration is expressed solely as an integer with no allowance for floating-point numbers.
- details (Object):
  - level (string): e.g., Beginner, Intermediate, Advanced.
  - description (string): Detailed description of the course

### Category Model:

The Category model includes the following fields:

 - _id (Object ID): A distinctive identifier generated by MongoDB.
 - name (String): A unique name of the category.

### Review  Model:

The Category model includes the following fields:

   - _id (Object ID): A distinctive identifier generated by MongoDB.
  - courseId (Object ID): A reference to the course collection.
  - rating (Number): Rating, which falls within the range of 1 to 5.
  - review (String): The comment or review text provided by the user.
## API Reference

### Course's API Endpoints

#### Retrieve a list of all course and also use query parameters to see the as your preference

```http
  GET /api/courses
```

#### Create a new course.

```http
  POST /api/courses
```
#### Retrieve a course by their ID.

```http
  GET /api/courses/:courseId
```
#### Update a course's information.

```http
  PUT /api/courses/:courseId
```


### Categories API Endpoints

#### Add a new category 

```http
  POST /api/categories
```

#### Retrieve all category 

```http
  GET /api/categories
```

### Review's API Endpoints

#### Add a new review 

```http
  POST /api/reviews
```

#### Retrieve all review 

```http
  GET /api/reviews
```


#### Get Course by ID with Reviews

```http
  GET /api/courses/:courseId/reviews
```

#### Get the Best Course Based on Average Review (Rating)

```http
  GET /api/courses/best
```





## Validation

All the courses, categories and reviews cretaion and updation is validated using either Zod to ensure data integrity.

## Error Handling

The application uses custom error handling to provide meaningful error messages. Errors are logged and sent in a consistent format to the client.

## Conclusion

This assignment requires developing a robust backend application using TypeScript, Express.js, and Mongoose for MongoDB. By implementing the Course, Category, and Review models, you'll create a system that efficiently manages course data, categories, and user reviews. The focus on proper data modeling, validation, and CRUD operations ensures that the application is scalable, maintainable, and adheres to best practices for modern web development. This will also provide hands-on experience with key technologies and demonstrate proficiency in building and managing a RESTful API for educational platforms or similar applications.
