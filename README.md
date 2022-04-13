# clipzy
Deno and Svelte application that allows you to clip your thoughts!

## How to run the project
1. Make sure you have Deno installed on your machine (for running backend), alongisde with Node&npm (for running client).
2. To run backend app, open terminal, navigate to `clipzy/backend` folder and run:
```
deno run --allow-net --allow-read --allow-write server.ts
```
Deno backend app should start working on `localhost:5000` by default.

3. To run frontend app, open terminal, navigate to `clipzy/frontend` folder and run:
```
npm run dev
```
Svelte frontend app should start working on `localhost:8080` by default. App is set to communicate with backend on `localhost:5000` by default. Open `localhost:8080` in your browser to check it out!

## API
This Deno server operates on a JSON data located under `./data/adverts.json` file instead of a classic database (for simplicity). It exposes the following endpoints:
* `GET /api/v1/advertisements` - returns a JSON containing an array of advertisements stored in the JSON file.
* `POST /api/v1/advertisements` - accepts a valid advertisement object in a body and responds with a JSON containing an array of updated advertisements.
* `DELETE /api/v1/advertisements` - accepts a valid id object in a body, and responds with a JSON containing an array of updated advertisements. 