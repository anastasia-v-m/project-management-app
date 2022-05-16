export interface IStatisDescription {
  status: number;
  message: string;
}

export const COMMON_ERROE = 'Что-то пошло не так!';

const statusDescription: Array<IStatisDescription> = [
  { status: 400, message: 'Неправильный запрос' },
  { status: 401, message: 'Неправильный логин и/или пароль' },
  { status: 403, message: 'Нет доступа' },
  { status: 404, message: 'Страница не найдена' },
  { status: 405, message: 'Использование запрещенного метода' },
  { status: 406, message: 'Нераспознанный ответ' },
  { status: 407, message: 'Неправильный логин и/или пароль прокси-сервера' },
  { status: 408, message: 'Превышен тайм-аут' },
  { status: 409, message: 'Конфликт данных' },
  { status: 410, message: 'Страница удалена' },
  { status: 500, message: 'Ошибка сервера' },
  { status: 501, message: 'Сервер не может обработать запрос' },
  { status: 502, message: 'Получен недопустимый ответ' },
  { status: 503, message: 'Сервер временно недоступен' },
  { status: 504, message: 'Превышен тайм-аут' },
];

export default statusDescription;
