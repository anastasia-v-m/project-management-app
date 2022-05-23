import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getToken } from '../../modules/commonFunctions';
import { GlobalAction } from '../../store/reducers';
import { useAppDispatch } from '../../store/store';
import { WELCOM_PAGE_URL } from '../utlsList';

export default function Stub(): JSX.Element {
  const navigator = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const interval = setInterval(() => {
      if (getToken() === '') {
        dispatch({ type: GlobalAction.setToken, payload: '' });
        navigator(WELCOM_PAGE_URL);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      STUB
      <Link className="btn" to={WELCOM_PAGE_URL}>
        go to main page
      </Link>
    </div>
  );
}
