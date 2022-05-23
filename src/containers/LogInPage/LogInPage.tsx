import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { PROJECTS_URL, STUB_URL } from '../utlsList';
import PopupSpot from '../../modules/PopupSpot';
import { GlobalAction } from '../../store/reducers';
import { useAppDispatch, useAppSelector } from '../../store/store';
import './loginPage.scss';
import { AppContext } from '../../components/AppContext';
import siteContent from '../content';

const LOGIN_ACCEPT = /^[a-z0-9_]+$/i;
const USERNAME_ACCEPT = /^[a-z0-9_ ]+$/i;
const PASSWORD_ACCEPT = /^[a-z0-9!@#$%^&*()_+-=/.,]+$/i;
const TOKEN_AGE = 600;
const BASE_URL = 'https://stark-shore-23540.herokuapp.com';

export interface ILogInData {
  login: string;
  password: string;
}
export interface ISignUpData {
  name: string;
  login: string;
  password: string;
}
export interface ISignUResponse {
  data: string;
}
export interface IResponse {
  token: string;
}
export interface IResponse2 {
  id: string;
  name: string;
  login: string;
}

const refUser: React.RefObject<HTMLInputElement> = React.createRef();
const refLogin: React.RefObject<HTMLInputElement> = React.createRef();
const refPass: React.RefObject<HTMLInputElement> = React.createRef();

const instance = axios.create({
  baseURL: BASE_URL,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const logIn = (data: ILogInData): Promise<any> => instance.post('/signin', data);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SignUp = (data: ISignUpData): Promise<any> => instance.post('/signup', data);
const Authorize = (tokenStr: string) =>
  (axios.defaults.headers.common['Authorization'] = `Bearer ${tokenStr}`);
//axios.get(BASE_URL, { headers: {"Authorization" : `Bearer ${tokenStr}`} });

const isCorrectField = (inputVal: string, accept: RegExp): boolean => {
  return !(inputVal.trim() === '' || !accept.test(inputVal));
};

const fixToken = (token: string) => {
  document.cookie = `token=${token}; max-age=${TOKEN_AGE}`;
};

export default function LogInPage(): JSX.Element {
  const dispatch = useAppDispatch();

  const [loginIsValid, setLoginIsValid] = useState(true);
  const [passwordIsValid, setPasswordIsValid] = useState(true);
  const [usernameIsValid, setUsernameIsValid] = useState(true);
  const navigator = useNavigate();
  let allFieldsValidated = true;

  const { loginType } = useAppSelector((state) => state.reducer);

  const setAllFieldsValidation = () => {
    const loginIsCorrect = isCorrectField((refLogin.current?.value as string) || '', LOGIN_ACCEPT);
    setLoginIsValid(loginIsCorrect);
    const passwordIsCorrect = isCorrectField(
      (refPass.current?.value as string) || '',
      PASSWORD_ACCEPT
    );
    setPasswordIsValid(passwordIsCorrect);
    const usernameIsCorrect = isCorrectField(
      (refUser.current?.value as string) || '',
      USERNAME_ACCEPT
    );
    setUsernameIsValid(usernameIsCorrect);

    allFieldsValidated =
      loginType === 1
        ? loginIsCorrect && passwordIsCorrect && usernameIsCorrect
        : loginIsCorrect && passwordIsCorrect;
  };

  const logInSubmitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const loginFunction = async () => {
      const requestData = {
        login: refLogin.current?.value as string,
        password: refPass.current?.value as string,
      };
      try {
        const { data, status } = await logIn(requestData).then((response) => response);
        dispatch({ type: GlobalAction.setRespStatus, payload: status });
        if (status === 201) {
          fixToken(data.token);
          console.log(data.token);
          dispatch({ type: GlobalAction.setToken, payload: data.token });
          await Authorize(data.token);
          navigator(PROJECTS_URL);
        }
      } catch (err) {
        dispatch({ type: GlobalAction.setPopup, payload: true });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        dispatch({ type: GlobalAction.setRespStatus, payload: err.response.status });
      }
    };

    setAllFieldsValidation();
    if (allFieldsValidated) {
      if (loginType === 0) {
        try {
          loginFunction();
        } catch (err) {
          dispatch({ type: GlobalAction.setPopup, payload: true });
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          dispatch({ type: GlobalAction.setRespStatus, payload: err.response.status });
        }
      } else if (loginType === 1) {
        const requestData = {
          name: (refUser.current?.value as string).trim(),
          login: refLogin.current?.value as string,
          password: refPass.current?.value as string,
        };
        try {
          const { status } = await SignUp(requestData).then((response) => response);
          dispatch({ type: GlobalAction.setRespStatus, payload: status });
          if (status === 201) {
            loginFunction();
          }
        } catch (err) {
          dispatch({ type: GlobalAction.setPopup, payload: true });
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          dispatch({ type: GlobalAction.setRespStatus, payload: err.response.status });
        }
      }
    }
  };

  return (
    <AppContext.Consumer>
      {(context): JSX.Element => (
        <>
          <PopupSpot type="query error" />
          <div className="input-wrapper">
            <form onSubmit={logInSubmitHandler}>
              <label
                className={`input-data__title ${loginType !== 1 ? 'elem-hidden' : ''}`}
                htmlFor="username"
              >
                {siteContent[context.locale].nameInputTitle}
                <input type="text" name="username" className="input-data__box" ref={refUser} />
                <p className="input-data__error-message">
                  {!usernameIsValid ? siteContent[context.locale].incorrectNameMsg : ''}
                </p>
              </label>
              <label className="input-data__title" htmlFor="login">
                {siteContent[context.locale].loginInputTitle}
                <input type="text" name="login" className="input-data__box" ref={refLogin} />
                <p className="input-data__error-message">
                  {!loginIsValid ? siteContent[context.locale].incorrectLoginMsg : ''}
                </p>
              </label>
              <label className="input-data__title" htmlFor="password">
                {siteContent[context.locale].passwordInputTitle}
                <input type="text" name="password" className="input-data__box" ref={refPass} />
                <p className="input-data__error-message">
                  {!passwordIsValid ? siteContent[context.locale].incorrectPasswordMsg : ''}
                </p>
              </label>
              <button className="btn input-data__btn" type="submit">
                OK
              </button>
            </form>
          </div>
        </>
      )}
    </AppContext.Consumer>
  );
}
