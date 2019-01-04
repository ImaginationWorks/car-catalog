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
- alerting
- move babel configuration to .babelrc
- webpack, I like 1) webpack watch, and 2) create aliases for source code folders to make imports much cleaner and easier.
- clean up code and fix bugs
- authentication
- and ...

## Folder Structure

```
car-catalog/
    - public
    - build
    - node_modules
    - src
        |_ components
            |_ MyComponentFolder
                |_ MyComponent.container.js
                |_ MyComponent.component.js // can be .jsx or .tsx
                |_ MyComponent.styles.js
            |_ index.js // export all components from one single source.
        |_ actions
        |_ reducers
        |_ selectors
        |_ assets
            |_ images // folder
            |_ fonts // folder
        |_ tests
        |_ services
        |_ App.js
        |_ index.js
        |_ logo.svg
        |_ serviceWorker.js 
    - .eslintrc
    - .eslintignore
    - README.md
    - package.json
    - .gitignore
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


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
