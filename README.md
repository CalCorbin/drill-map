# Drill Map

This repo is a web application for displaying and interacting with map data using React and Leaflet.

# Table of Contents

- [Drill Map](#drill-map)
- [Prerequisites](#prerequisites)
- [Installation and Setup](#installation-and-setup)
- [Linting](#linting)
- [Testing](#testing)
    - [Running Tests](#running-tests)
- [Pull Requests](#pull-requests)
- [Technologies](#technologies)

## Prequisites

Before you begin, ensure you have the following installed on your system:
- [Node.js](https://nodejs.org/) (latest LTS version recommended)
- npm (comes with Node.js)

## Installation and Setup

Follow these steps to get the application running locally:
1. Clone the repository:
``` bash
   git clone https://github.com/yourusername/drill-map.git
   cd drill-map
```
2. Install dependencies:
``` bash
   npm install
```
3. Start the development server:
``` bash
   npm run dev
```
4. Open your browser and navigate to [http://localhost:3000/drill-map](http://localhost:3000/drill-map). You should
see a really cool map!

## Linting

This project uses ESLint for code quality and consistency. The configuration extends Next.js ESLint rules to ensure best practices.
To run the linter:
``` bash
npm run lint
```

## Testing

The project uses Cypress for component and integration testing.

### Running Tests
- To open the Cypress test runner:
``` bash
  npm run cy:open
```
- To run component tests in headless mode:
``` bash
  npm run test:component
```
- To run the complete CI test suite (linting and component tests):
``` bash
  npm run test:ci
```

## Pull Requests

Every pull request runs off the `npm run test:ci` command using github workflows. Ensure you run this command before
creating a pull request so you can catch any errors early. Otherwise, you won't be able to merge changes.

## Technologies
- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [Leaflet](https://leafletjs.com/)
- [React Leaflet](https://react-leaflet.js.org/)
- [Cypress](https://www.cypress.io/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
