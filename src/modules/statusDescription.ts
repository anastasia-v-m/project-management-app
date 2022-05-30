export interface IStatisDescription {
  status: number;
  message: [string, string];
}

export const COMMON_ERROE = ['Something is wrong!', 'Что-то пошло не так!'];

const statusDescription: Array<IStatisDescription> = [
  { status: 0, message: [' ', ' '] },
  { status: 200, message: ['Done', 'Готово'] },
  { status: 201, message: ['Done', 'Готово'] },
  { status: 204, message: ['Done', 'Готово'] },
  { status: 400, message: ['Bad request', 'Неправильный запрос'] },
  { status: 401, message: ['Bad login or password', 'Неправильный логин и/или пароль'] },
  { status: 403, message: ['Forbidden', 'Нет доступа'] },
  { status: 404, message: ['Page not found', 'Страница не найдена'] },
  { status: 405, message: ['Action not allowed', 'Использование запрещенного метода'] },
  { status: 406, message: ['You get not acceptable answer', 'Нераспознанный ответ'] },
  {
    status: 407,
    message: ['Bad proxy authentication', 'Неправильный логин и/или пароль прокси-сервера'],
  },
  { status: 408, message: ['Time is over', 'Превышен тайм-аут'] },
  {
    status: 409,
    message: [
      'Data conflict. May be them are used already.',
      'Конфликт данных. Возможно они уже использованы.',
    ],
  },
  { status: 410, message: ['Page is gone', 'Страница удалена'] },
  { status: 500, message: ['Internal  server error', 'Ошибка сервера'] },
  { status: 501, message: ['Not implemented', 'Сервер не может обработать запрос'] },
  { status: 502, message: ['Bad gateway', 'Получен недопустимый ответ'] },
  { status: 503, message: ['Service unavailable', 'Сервер временно недоступен'] },
  { status: 504, message: ['Gateway timeout', 'Превышен тайм-аут'] },
];

export default statusDescription;
