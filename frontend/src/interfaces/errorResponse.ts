interface ErrorResponse {
  response: {
    data: {
      message: string;
      method: string;
      statusCode: number;
    };
  };
}

export default ErrorResponse;
