import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../../components/AppContext';
import siteContent from '../../containers/content';
import { STUB_URL } from '../../containers/utlsList';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { getToken } from '../commonFunctions';
import AddBoardSVG from '../../assets/AddBoardSVG';
import EditSVG from '../../assets/EditSVG';
import LogoutSVG from '../../assets/LogoutSVG';
import PopupSpot from '../PopupSpot';
import './header.scss';
import { GlobalAction } from '../../store/reducers';

const HEADER_BOTTOM = 156;

export default function Header(): JSX.Element {
  const { headerBottom } = useAppSelector((state) => state.reducer);
  const dispatch = useAppDispatch();

  const fixYPosition = () => {
    dispatch({ type: GlobalAction.setHeaderBottom, payload: window.scrollY });
  };
  useEffect(() => {
    window.addEventListener('scroll', fixYPosition);
    return () => window.removeEventListener('scroll', fixYPosition);
  }, []);

  const [isToken, setIsToken] = useState(getToken() !== '');
  useEffect(() => {
    const interval = setInterval(() => {
      setIsToken(getToken() !== '');
      if (getToken() === '') {
        dispatch({ type: GlobalAction.setToken, payload: '' });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const removeToken = () => {
    document.cookie = 'token=';
  };
  const logOutHandler = (e: React.SyntheticEvent) => {
    removeToken();
  };

  const newBoardCreatingHandler = () => {
    if (isToken) {
      dispatch({ type: GlobalAction.setPopupNewBoard, payload: true });
    }
  };

  return (
    <AppContext.Consumer>
      {(context): JSX.Element => (
        <header className={`header ${headerBottom > HEADER_BOTTOM ? 'animated-header' : ''}`}>
          <PopupSpot type="board creating" />
          <nav className="header__navigation">
            <div className="header__navigation-buttons">
              <Link className={`header__btn elem-${isToken ? 'visible' : 'hidden'}`} to={STUB_URL}>
                <span className="header__navigation-title">
                  {siteContent[context.locale].btnEditProfile}
                </span>
                <span className="header__navigation-pict">
                  <EditSVG />
                </span>
              </Link>
              <button
                className={`header__btn elem-${isToken ? 'visible' : 'hidden'}`}
                onClick={logOutHandler}
              >
                <span className="header__navigation-title">
                  {siteContent[context.locale].logOutBtn}
                </span>
                <span className="header__navigation-pict">
                  <LogoutSVG />
                </span>
              </button>
              <button
                className={`header__btn elem-${isToken ? 'visible' : 'hidden'}`}
                onClick={newBoardCreatingHandler}
              >
                <span className="header__navigation-title">
                  {siteContent[context.locale].btnCreateNewBoard}
                </span>
                <span className="header__navigation-pict">
                  <AddBoardSVG />
                </span>
              </button>
            </div>
            <div className="header__lang-toggler-container">
              <span className="header__lang-toggler-title">{siteContent[context.locale].lang}</span>
              <label className="switch header__lang-toggler">
                <input
                  type="checkbox"
                  checked={context.locale === 1}
                  onChange={context.setLocalIndex}
                />
                <span className="slider round" />
              </label>
            </div>
          </nav>
        </header>
      )}
    </AppContext.Consumer>
  );
}
