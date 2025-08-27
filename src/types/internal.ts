export type ApiSuccessResponse<T> = {
  success: true;
  data: T;
};

export type ApiErrorResponse = {
  success: false;
  errorMessage: string;
};

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;
