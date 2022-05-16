import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { STUB_URL } from '../../containers/utlsList';
import { useAppSelector } from '../../store/store';
import './header.scss';

const HEADER_BOTTOM = 156;

export default function WelcomePage(): JSX.Element {
  const { headerBottom } = useAppSelector((state) => state.reducer);

  const [logedIn, setLogedIn] = useState(false);
  const logOutHandler = (e: React.SyntheticEvent) => {
    //
  };

  return (
    <header className={`header ${headerBottom > HEADER_BOTTOM ? 'animated-header' : ''}`}>
      <nav className="header__navigation">
        <div className="header__navigation-buttons">
          <Link className={`header__btn elem-${logedIn ? 'visible' : 'hidden'}`} to={STUB_URL}>
            edit profile
          </Link>
          <button
            className={`header__btn elem-${logedIn ? 'visible' : 'hidden'}`}
            onClick={logOutHandler}
          >
            log out
          </button>
          <button className={`header__btn elem-${logedIn ? 'visible' : 'hidden'}`}>
            create new board
          </button>
        </div>
      </nav>
    </header>
  );
}
