import React, { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import PopupSpot from '../../modules/PopupSpot';
import { GlobalAction } from '../../store/reducers';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { AppContext } from '../../components/AppContext';
import siteContent from '../content';
import Indicator from '../../components/Indicator';
import { getToken, jwtDecoder } from '../../modules/commonFunctions';
import LogInSection from '../../modules/LogInSection';
import Header from '../../modules/Header/Header';
import Footer from '../../modules/Footer/Footer';
import './userPage.scss';

const LOGIN_ACCEPT = /^[a-z0-9_]+$/i;
const USERNAME_ACCEPT = /^[a-z0-9_ ]+$/i;
const PASSWORD_ACCEPT = /^[a-z0-9!@#$%^&*()_+-=/.,]+$/i;
const BASE_URL = 'https://stark-shore-23540.herokuapp.com';

export interface IUserData {
  name: string;
  login: string;
  password: string;
}

export interface IResponseUserUpdate {
  config: never;
  data: never;
  headers: never;
  status: number;
  statusText: string;
}

export interface IResponseUserGet {
  config: never;
  data: IUserData;
  headers: never;
  status: number;
  statusText: string;
}

const refUser: React.RefObject<HTMLInputElement> = React.createRef();
const refLogin: React.RefObject<HTMLInputElement> = React.createRef();
const refPass: React.RefObject<HTMLInputElement> = React.createRef();
const refPass2: React.RefObject<HTMLInputElement> = React.createRef();

const instance = axios.create({
  baseURL: BASE_URL,
});

export default function UserPage(): JSX.Element {
  const token = getToken();
  const { userId } = jwtDecoder(token);
  const headers = { Authorization: `Bearer ${token}` };

  const UpdateUser = (data: IUserData): Promise<IResponseUserUpdate> =>
    instance.put(`/users/${userId}`, data, { headers });

  const GetUser = (): Promise<IResponseUserGet> => instance.get(`/users/${userId}`, { headers });

  const isCorrectField = (inputVal: string, accept: RegExp): boolean => {
    return !(inputVal.trim() === '' || !accept.test(inputVal));
  };

  const dispatch = useAppDispatch();
  const { password } = useAppSelector((state) => state.reducer);

  const [isLoaded, setIsLoaded] = useState(true);
  const [isConfirm, setisConfirm] = useState(false);
  const [loginIsValid, setLoginIsValid] = useState(true);
  const [passwordIsValid, setPasswordIsValid] = useState(true);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [usernameIsValid, setUsernameIsValid] = useState(true);
  let allFieldsValidated = true;

  const [isToken, setIsToken] = useState(getToken() !== '');
  useEffect(() => {
    const interval = setInterval(() => {
      setIsToken(getToken() !== '');
    }, 1000);
    if (getToken() === '') {
      dispatch({ type: GlobalAction.setToken, payload: '' });
    } else if (!isToken) {
      dispatch({ type: GlobalAction.setToken, payload: '' });
    }
    return () => clearInterval(interval);
  }, []);

  const [name, setName] = useState('');
  const [login, setLogin] = useState('');
  const [pass, setPass] = useState('');

  const fillUser = async () => {
    const response = await GetUser()
      .then((response) => {
        return response;
      })
      .catch((err: AxiosError) => {
        dispatch({ type: GlobalAction.setRespStatus, payload: err.response?.status });
        dispatch({ type: GlobalAction.setPopup, payload: true });
        setIsLoaded(true);
      });
    if (response) {
      if ((response as IResponseUserGet).status === 200) {
        setName((response as IResponseUserGet).data.name);
        setLogin((response as IResponseUserGet).data.login);
        setPass(password);
        dispatch({
          type: GlobalAction.setRespStatus,
          payload: (response as IResponseUserGet).status,
        });
      }
    }
  };

  useEffect(() => {
    fillUser();
  }, []);

  const setAllFieldsValidation = () => {
    const loginIsCorrect = isCorrectField((refLogin.current?.value as string) || '', LOGIN_ACCEPT);
    setLoginIsValid(loginIsCorrect);
    const passwordIsCorrect =
      (refPass.current?.value as string) === '' ||
      isCorrectField((refPass.current?.value as string) || '', PASSWORD_ACCEPT);
    setPasswordIsValid(passwordIsCorrect);
    const usernameIsCorrect = isCorrectField(
      (refUser.current?.value as string) || '',
      USERNAME_ACCEPT
    );
    setUsernameIsValid(usernameIsCorrect);

    allFieldsValidated = loginIsCorrect && passwordIsCorrect && usernameIsCorrect;
  };

  const submitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const updateFunction = async () => {
      const requestData = {
        name: refUser.current?.value as string,
        login: refLogin.current?.value as string,
        password:
          (refPass.current?.value as string) === '' ? pass : (refPass.current?.value as string),
      };
      const response = await UpdateUser(requestData)
        .then((response) => {
          return response;
        })
        .catch((err: AxiosError) => {
          dispatch({ type: GlobalAction.setRespStatus, payload: err.response?.status });
          dispatch({ type: GlobalAction.setPopup, payload: true });
          setIsLoaded(true);
        });
      if (response) {
        if ((response as IResponseUserUpdate).status === 200) {
          dispatch({
            type: GlobalAction.setRespStatus,
            payload: (response as IResponseUserUpdate).status,
          });
          dispatch({ type: GlobalAction.setPopup, payload: true });
          setisConfirm(false);
          if (refPass.current) {
            refPass.current.value = '';
          }
          if (refPass2.current) {
            refPass2.current.value = '';
          }
        }
      }
      setIsLoaded(true);
    };

    setAllFieldsValidation();
    setPasswordsMatch((refPass.current?.value as string) === (refPass2.current?.value as string));
    if (
      allFieldsValidated &&
      (refPass.current?.value as string) === (refPass2.current?.value as string)
    ) {
      setIsLoaded(false);
      updateFunction();
    }
  };

  const passChangeHandler = () => {
    setisConfirm(true);
  };

  return (
    <AppContext.Consumer>
      {(context): JSX.Element => (
        <>
          <LogInSection />
          <Header />
          <main>
            <PopupSpot type="query error" />
            <div className="input-wrapper">
              <form onSubmit={submitHandler}>
                <label className="input-data__title" htmlFor="username">
                  {siteContent[context.locale].nameInputTitle}
                  <input
                    type="text"
                    name="username"
                    className="input-data__box"
                    ref={refUser}
                    defaultValue={name}
                  />
                  <p className="input-data__error-message">
                    {!usernameIsValid ? siteContent[context.locale].incorrectNameMsg : ''}
                  </p>
                </label>
                <label className="input-data__title" htmlFor="login">
                  {siteContent[context.locale].loginInputTitle}
                  <input
                    autoComplete="on"
                    type="text"
                    name="login"
                    className="input-data__box"
                    ref={refLogin}
                    defaultValue={login}
                  />
                  <p className="input-data__error-message">
                    {!loginIsValid ? siteContent[context.locale].incorrectLoginMsg : ''}
                  </p>
                </label>
                <label className="input-data__title" htmlFor="password">
                  {siteContent[context.locale].passwordInputTitle}
                  <input
                    autoComplete="new-password"
                    type="password"
                    name="password"
                    className="input-data__box"
                    ref={refPass}
                    onChange={passChangeHandler}
                  />
                  <p className="input-data__error-message">
                    {!passwordIsValid ? siteContent[context.locale].incorrectPasswordMsg : ''}
                  </p>
                </label>
                <label
                  className={`input-data__title ${!isConfirm ? 'elem-hidden' : ''}`}
                  htmlFor="password2"
                >
                  {siteContent[context.locale].passwordConfirmTitle}
                  <input
                    autoComplete="new-password"
                    type="password"
                    name="password2"
                    className="input-data__box"
                    ref={refPass2}
                  />
                  <p className="input-data__error-message">
                    {!passwordsMatch ? siteContent[context.locale].incorrectConfirmMsg : ''}
                  </p>
                </label>
                <button className="btn input-data__btn" type="submit">
                  OK
                </button>
              </form>
            </div>
            <p className={`loading ${isLoaded ? '' : 'active-loading'}`}>
              <Indicator prefix={isLoaded ? '' : 'active-spinning'} />
            </p>
          </main>
          <Footer />
        </>
      )}
    </AppContext.Consumer>
  );
}
