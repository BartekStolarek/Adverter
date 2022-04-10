import { Context } from 'https://deno.land/x/oak/mod.ts';

// Custom errorHandler is used to catch any exceptions that would occur
// in the application and handle them in an unified way 
const customErrorHandler = async (context: Context, next: any) => {
  try {
    await next();
  } catch (error) {
    console.error(error);
    context.response.body = {
      success: false,
      message: 'Failed to process this request.'
    };
    context.response.status = 500;
  }
};

export default customErrorHandler;