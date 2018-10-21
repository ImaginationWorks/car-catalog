This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Table of Contents

- [Design](#design)
- [Future improvements](#future-improvements)
- [Folder Structure](#folder-structure)
- [Available Scripts](#available-scripts)
  - [npm start](#npm-start)
  - [npm test](#npm-test)
  - [npm run build](#npm-run-build)
  - [npm run eject](#npm-run-eject)

## Design
This demo app is built in React with the following features: 
- SSR implemented.
- use EBM for styling methodology.
- a fake data APIs which reads data from json files is provided.

## Future improvements
- Tests
- styling
- fetch data from real APIs
- move babel configuration to .babelrc
- clean up code
- authentication
- and ...

## Folder Structure

```
car-catalog/
  README.md
  node_modules/
  package.json
  .gitignore
  .eslintrc
  public/
    index.html
    favicon.ico
  server/
    apis/
      data/
      routes/
    config/
      winston.js
    index.js
    loader.js
    server.js
  src/
    app/
      assets/
      components/
      routes/
      app.css
      app.js
      header.js
    redux/
      reducers/
      selectors/
    services/
    index.css
    index.js
    logo.svg
    serviceWorker.js 
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the file names include the hashes.<br>
Your app is ready to be deployed!

### `npm run serve`

run the production app in local env.

### `npm run lint`

run eslint validation.
