/* eslint max-classes-per-file: 0 */
/* eslint no-param-reassign: 0 */

export type ErrorData = {
  code: number;
  subCode: number;
  name: string;
  message: string;
};

export abstract class ChatError extends Error {
  readonly data: ErrorData;

  readonly code: 400;

  readonly message: string;

  readonly name: string;

  readonly stack: string | undefined;

  protected constructor(data: ErrorData) {
    super('Bad Request');
    this.code = 400;
    this.data = data;
  }
}

export class AuthError extends ChatError {
  constructor(data) {
    data.subCode = data.code;
    data.code = 1;
    data.name = 'AuthError';
    super(data);
  }
}
