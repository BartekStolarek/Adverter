# clipzy
Deno and Svelte application that allows you to clip your thoughts!

## How to run the project
1. Make sure you have Deno installed on your machine
2. Open terminal and run:
```
deno run --allow-net --allow-read --allow-write server.ts
```

## API
This Deno server operates on a JSON data located under `./data/adverts.json` file instead of a classic database (for simplicity). It exposes the following endpoints:
* `GET /api/v1/advertisements` - returns a JSON containing an array of advertisements stored in the JSON file.
* `POST /api/v1/advertisements` - accepts a valid advertisement object in a body and responds with a JSON containing an array of updated advertisements.
* `DELETE /api/v1/advertisements` - accepts a valid id object in a body, and responds with a JSON containing an array of updated advertisements. 