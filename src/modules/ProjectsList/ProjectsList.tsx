import React, { SyntheticEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../../components/AppContext';
import instance from '../../components/beNavigator';
import siteContent from '../../containers/content';
import { COLUMNS_URL, STUB_URL, WELCOM_PAGE_URL } from '../../containers/utlsList';
import { GlobalAction } from '../../store/reducers';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { getToken } from '../commonFunctions';
import Confirmation from '../Confirmation';
import './projectList.scss';

const HEADER_BOTTOM = 156;

export interface IProjectCard {
  id: string;
  title: string;
  description: string;
}
export default function ProjectsList(): JSX.Element {
  const navigator = useNavigate();
  const token = getToken();
  const headers = { Authorization: `Bearer ${token}` };

  const fillBoardsArray = async () => {
    const { data } = await getAllBoards();
    setBoardsArray(data);
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getAllBoards = (): Promise<any> => instance.get('/boards', { headers });
  const [boardsArray, setBoardsArray] = useState([]);

  useEffect(() => {
    fillBoardsArray();
  }, []);

  const dispatch = useAppDispatch();

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
          <Confirmation message={siteContent[context.locale].msgBoardDelete} boardId={boardId} />
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
