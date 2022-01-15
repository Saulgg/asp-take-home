# GitHub Topic Explorer

## Dev Notes

This project uses the following libraries and tools:
### Create React App
* To bootstrap a React App.

### React Query:
* Provides a standard way of getting values from a server
* Works with graphql
* Reduces boilerplate since it has fetching statuses integrated that work out of the box
* Easy to test
* Caches values so improves user experience, for example, when loading a topic that was previously loaded.

### GraphQL
* Used to create the query

### GraphQL-request
* Minimal GraphQL client

### React Testing Library and Jest
* Used for writing tests without implementation details.

## Installation

To install the project you must run the following script:

### `npm install`

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

## Future Improvements
* Code Structuring
  * Create a folder structure as components grow.
* Refactoring:
  * Make the Topics component more independent, so it can be used without props, probably using Context so we stop the searchTerm prop drill.
  * Implement a standard for writing CSS, like BEM.
* Additional Features:
  * Add Tests for Accessibility.
  * Add PropTypes.
  * Implement TypeScript to catch bugs before Runtime.
  * Add an Error Boundary.
