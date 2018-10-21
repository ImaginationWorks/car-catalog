import { status, json } from './helpers';


export default function (url, { ...options } = {}) {
  const finalOptions = {
    ...options,
  };

  return fetch(url, finalOptions)
  .then(status)
  .then(json)
  .catch((error) => {
    throw error;
  });
}
