import { AxiosError, AxiosResponse } from 'axios';
import React, { SyntheticEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../../components/AppContext';
import instance from '../../components/beNavigator';
import Indicator from '../../components/Indicator';
import siteContent from '../../containers/content';
import { COLUMNS_URL, WELCOM_PAGE_URL } from '../../containers/utlsList';
import { GlobalAction } from '../../store/reducers';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { getToken } from '../commonFunctions';
import Confirmation from '../Confirmation';
import PopupSpot from '../PopupSpot';
import './projectList.scss';

export interface IProjectCard {
  id: string;
  title: string;
  description: string;
}
export default function ProjectsList(): JSX.Element {
  const navigator = useNavigate();
  const token = getToken();
  const headers = { Authorization: `Bearer ${token}` };

  const [isLoaded, setIsLoaded] = useState(true);

  const fillBoardsArray = async () => {
    const data = await getAllBoards()
      .then((response) => response.data)
      .catch((err: AxiosError) => {
        dispatch({ type: GlobalAction.setRespStatus, payload: err.response?.status });
        dispatch({ type: GlobalAction.setPopup, payload: true });
        setIsLoaded(true);
      });

    if (data) {
      setBoardsArray(data);
      setIsLoaded(true);
    }
  };

  const [isToken, setIsToken] = useState(getToken() !== '');
  useEffect(() => {
    const interval = setInterval(() => {
      setIsToken(getToken() !== '');
    }, 1000);
    if (getToken() === '') {
      dispatch({ type: GlobalAction.setToken, payload: '' });
    }
    return () => clearInterval(interval);
  }, []);

  const getAllBoards = (): Promise<AxiosResponse> => instance.get('/boards', { headers });
  const [boardsArray, setBoardsArray] = useState([]);

  useEffect(() => {
    fillBoardsArray();
  }, []);

  const dispatch = useAppDispatch();
  const { isReload } = useAppSelector((state) => state.reducer);

  useEffect(() => {
    if (isReload) {
      dispatch({ type: GlobalAction.setIsReload, payload: false });
      fillBoardsArray();
    }
  }, [isReload]);

  useEffect(() => {
    if (!isToken) {
      setBoardsArray([]);
      dispatch({ type: GlobalAction.setToken, payload: '' });
      navigator(WELCOM_PAGE_URL);
    }
  }, [isToken]);

  const [boardId, setBoardId] = useState('');
  const confrmation = (id: string) => {
    setBoardId(id);
    dispatch({ type: GlobalAction.setIsPopupConfirm, payload: true });
  };

  return (
    <AppContext.Consumer>
      {(context): JSX.Element => (
        <ul className="project-list">
          <PopupSpot type="query error" />
          <Confirmation message={siteContent[context.locale].msgBoardDelete} boardId={boardId} />
          <p className={`loading ${isLoaded ? '' : 'active-loading'}`}>
            <Indicator prefix={isLoaded ? '' : 'active-spinning'} />
          </p>
          {boardsArray.map(
            (item: IProjectCard, index: number): JSX.Element => (
              <li className="project-card" key={index}>
                <Link
                  className="project-card__item"
                  to={COLUMNS_URL}
                  state={{ boardId: item.id as string }}
                >
                  <div className="project-card__title">{item.title}</div>
                  <div className="project-card__description">{item.description}</div>
                </Link>
                <button
                  className="small-btn"
                  onClick={(e: SyntheticEvent) => {
                    e.stopPropagation();
                    confrmation(item.id);
                  }}
                >
                  {siteContent[context.locale].btnDeleteBoard}
                </button>
              </li>
            )
          )}
        </ul>
      )}
    </AppContext.Consumer>
  );
}
