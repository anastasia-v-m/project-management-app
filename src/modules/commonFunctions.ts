import statusDescription, { COMMON_ERROE } from './statusDescription';
import jwt_decode from 'jwt-decode';

export interface IToken {
  userId: string;
  login: string;
  iat: number;
}

export const tokenIsAvaliable = (): boolean => {
  const arrayCookie = document.cookie.split(';');
  const tokenNameValue = arrayCookie.find((item) => item.substr(0, 5) === 'token');
  return tokenNameValue !== undefined;
};

export const getToken = (): string => {
  const arrayCookie = document.cookie.split(';');
  let tokenNameValue = arrayCookie.find((item) => item.substr(0, 5) === 'token');
  if (tokenNameValue === undefined) {
    tokenNameValue = '';
  } else {
    tokenNameValue = tokenNameValue.substr(6);
  }
  return tokenNameValue;
};

export const getRespMessage = (respStatus: number): Array<string> => {
  const result = statusDescription.find((item) => item.status === respStatus);
  let message;
  if (result) {
    message = result.message;
  } else {
    message = COMMON_ERROE;
  }
  return message;
};

export const jwtDecoder = (jwtToken: string): IToken => jwt_decode(jwtToken);
