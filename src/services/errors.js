/* eslint-disable react/sort-comp */

export class ServerError extends Error {

  constructor(body) {
    super();
    this._body = body;
  }

  name = 'ServerError'

  get message() {
    if (this._body.hasOwnProperty('error')) {
      return this._body.error;
    }
    return this._body;
  }
}
