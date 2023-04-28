type ApiResponseErrorOptions = ErrorOptions & {
  cause?: string;
};

export class ApiResponseError extends Error {
  cause?: string;

  constructor(message: string, options?: ApiResponseErrorOptions) {
    super(message, options);
    this.message = message;
    this.cause = options?.cause;
  }
}
