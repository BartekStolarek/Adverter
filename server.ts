import { Application } from 'https://deno.land/x/oak/mod.ts';
import router from './routes/routes.ts';
import customErrorHandler from './middleware/error.handler.ts';

const port: number = 5000;
const app = new Application();

app.use(customErrorHandler);
app.use(router.routes());
app.use(router.allowedMethods());

// Deno offers global async scope, so we don't have to wrap function in it
// when calling await
console.log(`Server running on localhost:${port}`);

await app.listen({ port });