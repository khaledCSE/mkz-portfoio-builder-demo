# Jobber Profile Builder

## Live Preview

https://mkz-portfoil-builder-demo.herokuapp.com

## Instructions to run on localhost

### Pre-requisits

1. Create a file named `.env` on root
2. Add the following to the `.env` file:
    - PORT=5000
    - DATABASE_URL=<MONGODB_URL>
    - API_SECRET=<ANY_STRING>
    - SERVER_ADDRESS=http://localhost:5000
    - NEXT_PUBLIC_API_BASE=http://localhost:5000/api
3. Open a terminal in the root and run `yarn` or `npm i`
4. Run `yarn build` or `npm run build` to build the project

### Run the app

1. Run `yarn start` or `npm run start` to run the project
2. Open a web browser and go to [http://localhost:5000](http://localhost:5000)
