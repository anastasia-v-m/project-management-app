import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../../components/AppContext';
import instance from '../../components/beNavigator';
import { PROJECTS_URL, STUB_URL, WELCOM_PAGE_URL } from '../utlsList';
import { GlobalAction } from '../../store/reducers';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { getToken } from '../../modules/commonFunctions';
import './columnsPage.scss';
import Footer from '../../modules/Footer/Footer';
import LogInSection from '../../modules/LogInSection';
import Header from '../../modules/Header/Header';
import siteContent from '../content';

export interface IColumn {
  id: string;
  title: string;
  order: number;
}
export interface IDataGetAllColumns {
  boardId: string;
}

export default function Columns(): JSX.Element {
  const dispatch = useAppDispatch();
  // const fixYPosition = () => {
  //   dispatch({ type: GlobalAction.setHeaderBottom, payload: window.scrollY });
  // };
  // useEffect(() => {
  //   window.addEventListener('scroll', fixYPosition);
  // });

  const location = useLocation();

  const boardId = (location.state as IDataGetAllColumns).boardId as string;
  const navigator = useNavigate();
  const token = getToken();
  const headers = { Authorization: `Bearer ${token}` };

  const [columnsArray, setColumnsArray] = useState([]);

  // const { boardId } = props;
  const fillColumnsArray = async (id: string) => {
    const { data } = await getAllColumns(id);
    setColumnsArray(data);
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
  const getAllColumns = (id: string): Promise<any> =>
    instance.get(`/boards/${id}/columns`, { headers });

  useEffect(() => {
    fillColumnsArray(boardId as string);
  }, []);

  useEffect(() => {
    if (!isToken) {
      dispatch({ type: GlobalAction.setToken, payload: '' });
      setColumnsArray([]);
      navigator(WELCOM_PAGE_URL);
    }
  }, [isToken]);

  return (
    <AppContext.Consumer>
      {(context): JSX.Element => (
        <>
          <LogInSection />
          <Header />
          <main className="columns">
            <menu className="columns__menu">
              <button className="btn">{siteContent[context.locale].btnCreateColumn}</button>
            </menu>
            <div className="columns__container">
              {columnsArray.map(
                (item: IColumn, index: number): JSX.Element => (
                  <div className="columns__item" key={index}>
                    <div className="columns__item-content">
                      <div className="columns__header">
                        <h5 className="columns__item-header">{item.title}</h5>
                        <button className="small-btn">
                          {siteContent[context.locale].btnCreateTask}
                        </button>
                      </div>
                      <div className="task-container">
                        <div className="task-item">blabla</div>
                        <div className="task-item">blabla</div>
                        <div className="task-item">blabla</div>
                        <div className="task-item">blabla</div>
                        <div className="task-item">blabla</div>
                        <div className="task-item">blabla</div>
                        <div className="task-item">blabla</div>
                        <div className="task-item">blabla</div>
                        <div className="task-item">blabla</div>
                        <div className="task-item">blabla</div>
                        <div className="task-item">blabla</div>
                        <div className="task-item">blabla</div>
                        <div className="task-item">blabla</div>
                        <div className="task-item">blabla</div>
                        <div className="task-item">blabla</div>
                        <div className="task-item">blabla</div>
                        <div className="task-item">blabla</div>
                        <div className="task-item">blabla</div>
                        <div className="task-item">blabla</div>
                        <div className="task-item">blabla</div>
                        <div className="task-item">blabla</div>
                        <div className="task-item">blabla</div>
                        <div className="task-item">blabla</div>
                        <div className="task-item">blabla</div>
                        <div className="task-item">blabla</div>
                        <div className="task-item">blabla</div>
                        <div className="task-item">blabla</div>
                        <div className="task-item">blabla</div>
                        <div className="task-item">blabla</div>
                        <div className="task-item">blabla</div>
                        <div className="task-item">blabla</div>
                        <div className="task-item">blabla</div>
                        <div className="task-item">blabla</div>
                        <div className="task-item">blabla</div>
                        <div className="task-item">blabla</div>
                        <div className="task-item">blabla</div>
                        <div className="task-item">blabla</div>
                        <div className="task-item">blabla</div>
                        <div className="task-item">blabla</div>
                        <div className="task-item">blabla</div>
                        <div className="task-item">blabla</div>
                        <div className="task-item">blabla</div>
                        <div className="task-item">blabla</div>
                        <div className="task-item">blabla</div>
                        <div className="task-item">blabla</div>
                        <div className="task-item">blabla</div>
                        <div className="task-item">blabla</div>
                        <div className="task-item">blabla</div>
                        <div className="task-item">blabla</div>
                        <div className="task-item">blabla</div>
                        <div className="task-item">blabla</div>
                        <div className="task-item">blabla</div>
                        <div className="task-item">blabla</div>
                        <div className="task-item">blabla</div>
                        <div className="task-item">blabla</div>
                        <div className="task-item">blabla</div>
                        <div className="task-item">blabla</div>
                        <div className="task-item">blabla</div>
                        <div className="task-item">blabla</div>
                        <div className="task-item">blabla</div>
                        <div className="task-item">blabla</div>
                        <div className="task-item">blabla</div>
                        <div className="task-item">blabla</div>
                        <div className="task-item">blabla</div>
                        <div className="task-item">blabla</div>
                        <div className="task-item">blabla</div>
                        <div className="task-item">blabla</div>
                        <div className="task-item">blabla</div>
                        <div className="task-item">blabla</div>
                        <div className="task-item">blabla</div>
                        <div className="task-item">blabla</div>
                        <div className="task-item">blabla</div>
                        <div className="task-item">blabla</div>
                        <div className="task-item">blabla</div>
                        <div className="task-item">blabla</div>
                        <div className="task-item">blabla</div>
                        <div className="task-item">blabla</div>
                        <div className="task-item">blabla</div>
                        <div className="task-item">blabla</div>
                        <div className="task-item">blabla</div>
                        <div className="task-item">blabla</div>
                        <div className="task-item">blabla</div>
                        <div className="task-item">blabla</div>
                        <div className="task-item">blabla</div>
                        <div className="task-item">blabla</div>
                        <div className="task-item">blabla</div>
                        <div className="task-item">blabla</div>
                        <div className="task-item">blabla</div>
                        <div className="task-item">blabla</div>
                        <div className="task-item">blabla</div>
                        <div className="task-item">blabla</div>
                        <div className="task-item">blabla</div>
                        <div className="task-item">blabla</div>
                        <div className="task-item">blabla</div>
                        <div className="task-item">blabla</div>
                        <div className="task-item">blabla</div>
                        <div className="task-item">blabla</div>
                        <div className="task-item">blabla</div>
                        <div className="task-item">blabla</div>
                        <div className="task-item">blabla</div>
                        <div className="task-item">blabla</div>
                        <div className="task-item">blabla</div>
                        <div className="task-item">blabla</div>
                        <div className="task-item">blabla</div>
                        <div className="task-item">blabla</div>
                        <div className="task-item">blabla</div>
                        <div className="task-item">blabla</div>
                        <div className="task-item">blabla000</div>
                      </div>
                      <div className="columns__footer">
                        <button className="small-btn">
                          {siteContent[context.locale].btnDeleteColumn}
                        </button>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </main>
          <Footer />
        </>
      )}
    </AppContext.Consumer>
  );
}
