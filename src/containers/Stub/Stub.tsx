import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { tokenIsAvaliable } from '../../modules/commonFunctions';
import { WELCOM_PAGE_URL } from '../utlsList';

export default function Stub(): JSX.Element {
  const navigator = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      if (!tokenIsAvaliable()) {
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
