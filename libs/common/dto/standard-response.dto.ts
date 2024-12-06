export interface StandardResponse<T> {
  status: 'success' | 'error';
  message: string;
  data?: T;
  error?: string;
}
