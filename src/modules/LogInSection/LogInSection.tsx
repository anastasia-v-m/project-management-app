import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../../components/AppContext';
import siteContent from '../../containers/content';
import { LOGIN_URL, PROJECTS_URL, WELCOM_PAGE_URL } from '../../containers/utlsList';
import { GlobalAction } from '../../store/reducers';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { getToken } from '../commonFunctions';
import './logInSection.scss';

export default function WelcomePage(): JSX.Element {
  const [isToken, setIsToken] = useState(getToken() !== '');
  const dispatch = useAppDispatch();

  useEffect(() => {
    const interval = setInterval(() => {
      setIsToken(getToken() !== '');
    }, 1000);
    if (getToken() === '') {
      dispatch({ type: GlobalAction.setToken, payload: '' });
    }
    return () => clearInterval(interval);
  }, []);

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
    <AppContext.Consumer>
      {(context): JSX.Element => (
        <section className="log-in-out-section">
          <div className="log-in-out-buttons">
            <Link
              className={`btn elem-${isToken ? 'hidden' : 'visible'}`}
              to={LOGIN_URL}
              onClick={logInClickHandler}
            >
              {siteContent[context.locale].logInBtn}
            </Link>
            <Link
              className={`btn elem-${isToken ? 'hidden' : 'visible'}`}
              to={LOGIN_URL}
              onClick={signUpClickHandler}
            >
              {siteContent[context.locale].signUpBtn}
            </Link>
            <Link className={`btn elem-${isToken ? 'visible' : 'hidden'}`} to={PROJECTS_URL}>
              {siteContent[context.locale].btnToMainPage}
            </Link>
          </div>
        </section>
      )}
    </AppContext.Consumer>
  );
}
