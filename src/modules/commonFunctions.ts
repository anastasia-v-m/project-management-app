export const tokenIsAvaliable = (): boolean => {
  const arrayCookie = document.cookie.split(';');
  const tokenNameValue = arrayCookie.find((item) => item.substr(0, 5) === 'token');
  return tokenNameValue !== undefined;
};
