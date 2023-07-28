This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Database

- two tables
  - words
    - id, word, defintion, is_deleted (for soft delete)
  - reviews
    - id, word_id,
    - user_id (for future scalability with multiple users),
    - bin,
    - time_to_next_appearance (timestamp)
    - wrong_attempts
    - is_deleted (for soft delete)

## Backend

- Uses `/app/api` folder from the next.js file structure, with route.js file containing all possible end-points.
- starting with version-1, all the current end-points will be inside this
- currently there is only one user supported, which is being utilised on front-end while adding the review. The default mock user-id is 1 stored in constants.
- To allow same user to access ADMIN panel there is a login like welcome page that allows to choose from dropdown for now.
- With the future addition of proper user-systems this can be separated well structured.
- words
  - GET - fetches all words non-deleted for [ADMIN view]
- word
  - POST - request to create a new word [ADMIN view]
    - that triggers addition in reviews table of that word too
- word/:id [ADMIN view]
  - GET - to fetch word by id
  - PUT - to edit the word by id
  - DELETE - to remove word by id
- review
  - GET - to fetch list of words with review in bin desc order for non-deleted words
    - this returns the status of TEMPORARY_DONE and PERMANENT_DONE based on the state of available words to review.
  - PUT - update the review one by one, with user's answer to it

## Frontend

Basically divided into three major routes,

- HOME or WELCOME
- ADMIN
- STUDENT

On the admin interface, user can create, update, delete the words.
On the student interface, user can play with the words one by one. Once all are fetched, if there are still more to review it shows TEMPORARY_DONE and PERMANENT_DONE.

- For the current implementation user will have to move back to home-screen and come back to student interface, so that we can fetch more words to review, if available. This can show the PERMENANT_DONE state, at the end.

- There are react-context-s created for each of these three categories. That makes it easier for components to read the only values they require, while also maintaining separation between operational functions that can make network calls and maintain separation of concern from business logic to view logic.
- This can further promote the usage of real-time correspondence with web-sockets if required for the student-playground.

## Misceleanous

There are few code modules that indicates the scope for observability.

1. One custom logger. Currently this is just a fancy console.log wrapper, that shows different colour on browser console.
   a. This tries to showcase possibility of logger solution to push the logs to a service with time-stamp and debugging for any certain incidents.

2. Request-Validator
   a. A custom request validator that currently checks the fields that can be updated. A condition modules that allows to validate against each condition.
   b. This indicates the requirement of using ORM solutions tied with other contraint based solutions on each field's value.

3.

## FUTURE

- Immediate future scope are categorised product ideas and technical improvements to strengthen the systems and making it more analysed and modularise the code. This can improve the development delivery time.

### Tech

- Using a request validation module that can support and enhance type system as well as make it easy to remove the SQL queries as string from each API call function. Making model more modular.
  - Currently connecting with this models (database system) is modularised with connection pool function.
- Attach logs to a centralised log system for better observability and debugging capabilities
- Create alerts based on these alerts, based on there severity and load on the system.
- Writing unit-test(s) on both the front-end and back-end side to increase coverage and define and check single responsibility of the modules.
- Automated load testing to test how system maintains connections and handles load.
- In memory, cache for the back-end application to keep track of how many words are reviewed already. This can help making less number of queries to the database.
- Front-end side, a more enhanced system of communicating with APIs in (near) real-time, maybe utilise web-sockets. This can enhance communication to users, as they play with words.
- Front-end side, a custom UI component for modals and banners to showcase notifications and statuses.
- Browser-side, store user-progress details and other user related information that can enhance our data collection on user-behaviour.
  - This can create that positive feedback loop for the product review, and features to developed and how to polish the current system.

### Product

- This section basically aims to show ideas of possible new features.
- Real time communication
- User usage tracking system as mentioned above, this can be utilised with logs pushing mechanism.
- Provide audio support for user to hear how the words can be pronounced.
  Hence there can be much more feature addition based on requirements and exploration. This is just a scratch on the surface.

## Deployment

Currently this is application is deployed using following platforms:

- PlanetScale for mysql database
- Vercel for the next.js app, that takes in DB related values as mentionde from the .env.local file mentioned
- Link to the app : https://hiring-divyesh-parmar-flashcards.vercel.app/
