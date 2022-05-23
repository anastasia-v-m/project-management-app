import statusDescription, { COMMON_ERROE } from './statusDescription';

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

export const getRespMessage = (respStatus: number): string => {
  const result = statusDescription.find((item) => item.status === respStatus);
  return result?.message || COMMON_ERROE;
};
