export interface IDevelopers {
  role: string;
  git: string;
}

const siteContent = [
  {
    logInBtn: 'log in',
    signUpBtn: 'sign up',
    logOutBtn: 'log out',
    btnToMainPage: 'go to main page',
    btnEditProfile: 'edit profile',
    btnCreateNewBoard: 'create new board',
    lang: 'en',
    nameInputTitle: 'Enter username',
    loginInputTitle: 'Enter login',
    passwordInputTitle: 'Enter password',
    incorrectLoginMsg: 'You should use only letters, digitals and _',
    incorrectNameMsg: 'You should use only letters, digitals, spaces and _',
    incorrectPasswordMsg: 'You should use only letters, digitals and !@#$%^&*()_+-=/.,',
    developers: [
      { role: 'developer', gitname: 'KISLY74' },
      { role: 'developer', gitname: 'yurkab24' },
      { role: 'developer', gitname: 'anastasia-v-m' },
      { role: 'mentor', gitname: 'kayarmolenka' },
    ],
  },
  {
    logInBtn: 'войти',
    signUpBtn: 'регистрация',
    logOutBtn: 'выйти',
    btnToMainPage: 'на главную',
    btnEditProfile: 'профиль',
    btnCreateNewBoard: 'создать доску',
    lang: 'рус',
    nameInputTitle: 'Введите имя',
    loginInputTitle: 'Введите логин',
    passwordInputTitle: 'Введите пароль',
    incorrectLoginMsg:
      'Для задания логина нужно использовать буквы латинского алфавита, цифры и знак подчеркивания',
    incorrectNameMsg:
      'Для задания логина нужно использовать буквы латинского алфавита, цифры, знак подчеркивания и пробел',
    incorrectPasswordMsg:
      'Для задания пароля нужно использовать буквы латинского алфавита, цифры и знаки !@#$%^&*()_+-=/.,',
    developers: [
      { role: 'разработчик', gitname: 'KISLY74' },
      { role: 'разработчик', gitname: 'yurkab24' },
      { role: 'разработчик', gitname: 'anastasia-v-m' },
      { role: 'ментор', gitname: 'kayarmolenka' },
    ],
  },
];

export default siteContent;
