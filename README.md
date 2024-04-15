# Preqin Take Home Exercise API

This is the API for the take home exercise. 

## Instructions

1. Install Docker on your machine if not available
2. Build api container with `docker build -t preqin-api .`
3. Run api container with `docker run --publish 8000:8000 preqin-api`
4. Api points can be found at `127.0.0.1:8000`
    * Docs for the api can be found at `127.0.0.1:8000/docs`
5. `cd` into the `/frontend/investors-dashboard` dir
6. Run `nvm use` to use node version in `.nvmrc`
7. Run `npm i` to install dependencies 
8. Run the cmd `npm run dev` to run the application locally
9. For tests, run the cmd `npm run test`
