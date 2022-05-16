import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LOGIN_URL, WELCOM_PAGE_URL } from '../../containers/utlsList';
import { GlobalAction } from '../../store/reducers';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { tokenIsAvaliable } from '../commonFunctions';
import './logInSection.scss';

export default function WelcomePage(): JSX.Element {
  const [isToken, setIsToken] = useState(tokenIsAvaliable());

  useEffect(() => {
    const interval = setInterval(() => {
      setIsToken(tokenIsAvaliable());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const dispatch = useAppDispatch();

  const setLoginType = (loginType: number) => {
    dispatch({ type: GlobalAction.setLoginType, payload: loginType });
  };
  const logInClickHandler = () => {
    setLoginType(0);
  };
  const signUpClickHandler = () => {
    setLoginType(1);
  };

  return (
    <section className="log-in-out-section">
      <div className="log-in-out-buttons">
        <Link
          className={`btn elem-${isToken ? 'hidden' : 'visible'}`}
          to={LOGIN_URL}
          onClick={logInClickHandler}
        >
          log in
        </Link>
        <Link
          className={`btn elem-${isToken ? 'hidden' : 'visible'}`}
          to={LOGIN_URL}
          onClick={signUpClickHandler}
        >
          sign up
        </Link>
        <Link className={`btn elem-${isToken ? 'visible' : 'hidden'}`} to={WELCOM_PAGE_URL}>
          go to main page
        </Link>
      </div>
    </section>
  );
}
