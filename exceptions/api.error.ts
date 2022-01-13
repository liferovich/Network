//anyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy

export class ApiError extends Error {
  status: number;
  errors: any[];

  constructor(status: number, message: string, errors = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static UnathorizedError() {
    return new ApiError(401, 'Unathorized user');
  }

  static BadRequest(message: string, errors: any = []) {
    return new ApiError(400, message, errors);
  }
}
