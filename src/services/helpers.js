import { ServerError } from './errors';


const error = (ErrorType) => (body) => {
  throw new ErrorType(body);
};

/**
 * Validates HTTP response and throws an error if it's not a 2xx.
 *
 * @see https://fetch.spec.whatwg.org/#response-class
 */
export function status(response) {
  if (response.ok) {
    return response;
  }

  // get the error body and throw an error
  return json(response).then(error(ServerError));
}

// we don't care about any other form
const SIMPLE_JSON_REGEX = /^(\[|\{)/;

/**
 * Decodes response body JSON.
 *
 * @see https://fetch.spec.whatwg.org/#response-class
 */
export function json(response) {
  return response.text().then((text) => SIMPLE_JSON_REGEX.test(text) ? JSON.parse(text) : parseStringValue(text));
}

function parseStringValue(text) {
  return text === 'null' ? null : text;
}

export const headers = {
  'Content-Type': 'application/json'
};
