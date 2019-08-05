// https://docs.stormpath.com/rest/product-guide/latest/reference.html#account
/**
 * Retrieving resources
 *
 * You can retrieve a resource representation by sending a GET.
 *
 * Responses to your GET calls will contain:
 *
 *  - An HTTP Status Code indicating success or failure (possible codes can be found below)
 *  - Any HTTP Headers
 *  - A Response Body, which will contain the requested entity resource (if the call succeeded), or a detailed error (if the call failed)
 *
 * Creating resources
 *
 * You create a resource by submitting an HTTP POST to a resource URL. Any POST body must be represented as JSON.
 * Requests that contain body content must specify the HTTP Content-Type header with a value of application/json.
 * Responses to your create POST calls will contain:
 *   - An HTTP Status Code indicating success or failure (possible codes can be found below)
 *   - Any HTTP Headers
 *   - A Response Body, which will contain the created entity resource (if the call succeeded), or a detailed error (if the call failed)
 */
export default {
  // The request was successful and the response body contains the resource requested.
  OK: 200,
  // The request was successful, we created a new resource, and the response body contains the representation.
  // The Location header contains the new resource’s canonical URL.
  CREATED: 201,
  // A common redirect response.
  // You can GET the resource at the URL found in the location response header.
  FOUND: 302,
  // The data given in the POST failed validation. Inspect the response body for details.
  BAD_REQUEST: 400,
  // Authentication credentials are required to access the resource.
  // All requests must be authenticated.
  SERVICE_UNAUTHORIZED: 401,
  // The supplied authentication credentials are not sufficient to access the resource.
  SERVICE_FORBIDDEN: 403,
  // We could not locate the resource based on the specified URL.
  NOT_FOUND: 404,
  // POST is not supported for the resource.
  METHOD_NOT_ALLOWED: 405,
  // You cannot create or update a resource because another resource already exists or conflicts with one you are submitting.
  CONFLICT: 409,
  // You did not specify the request Content-Type header to have a value of application/json. Only application/json is currently supported.
  UNSUPPORTED_MEDIA_TYPE: 415,
  // Your application is sending too many simultaneous requests.
  TOO_MANY_REQUESTS: 429,
  // We could not create or update the resource. Please try again.
  SERVER_ERROR: 500,
  // We are temporarily unable to service the request. Please wait for a bit and try again.
  SERVICE_UNAVAILABLE: 503,
};

