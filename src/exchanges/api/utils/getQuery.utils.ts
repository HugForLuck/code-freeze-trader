import { HttpRequest } from '../requests/httpRequest';

export function getQuery({ params }: HttpRequest) {
  const queryParams = new URLSearchParams(params);
  queryParams.sort();
  return queryParams.toString();
}
