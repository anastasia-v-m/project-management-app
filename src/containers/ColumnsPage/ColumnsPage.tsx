import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppContext } from '../../components/AppContext';
import instance from '../../components/beNavigator';
import { WELCOM_PAGE_URL } from '../utlsList';
import { GlobalAction } from '../../store/reducers';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { getToken } from '../../modules/commonFunctions';
import Footer from '../../modules/Footer/Footer';
import LogInSection from '../../modules/LogInSection';
import Header from '../../modules/Header/Header';
import siteContent from '../content';
import PopupSpot from '../../modules/PopupSpot';
import './columnsPage.scss';
import { AxiosError, AxiosResponse } from 'axios';
import Confirmation from '../../modules/Confirmation';

export interface IColumn {
  id: string;
  title: string;
  order: number;
}
export interface IDataGetAllColumns {
  boardId: string;
}
export interface ITaskFile {
  filename: string;
  fileSize: number;
}
export interface IOneTask {
  id: string;
  title: string;
  done: false;
  order: number;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
  files: [ITaskFile];
}
export interface ITasks {
  columnId: string;
  content: Array<IOneTask>;
}
export interface IResponseColumn {
  config: never;
  data: IColumn;
  headers: never;
  status: number;
  statusText: string;
}

export default function Columns(): JSX.Element {
  const arr = [] as ITasks[];

  const dispatch = useAppDispatch();
  const { isReload } = useAppSelector((state) => state.reducer);

  const location = useLocation();

  const boardId = (location.state as IDataGetAllColumns).boardId as string;
  const navigator = useNavigate();
  const token = getToken();
  const headers = { Authorization: `Bearer ${token}` };

  const [isLoaded, setIsLoaded] = useState(true);

  const [popType, setPopType] = useState('query error');

  const [columnsArray, setColumnsArray] = useState<Array<IColumn>>([]);
  const [tasksArray, setTasksArray] = useState<Array<ITasks>>([]);
  const [deletedColumnId, setDeletedColumnId] = useState('');

  const getAllColumns = (id: string): Promise<AxiosResponse> =>
    instance.get(`/boards/${id}/columns`, { headers });

  const getAllTasks = (boardId: string, columnId: string): Promise<AxiosResponse> =>
    instance.get(`/boards/${boardId}/columns/${columnId}/tasks`, { headers });

  const fillColumnsArray = async (id: string) => {
    setIsLoaded(false);
    const data = await getAllColumns(id)
      .then((response) => response.data)
      .catch((err: AxiosError) => {
        dispatch({ type: GlobalAction.setRespStatus, payload: err.response?.status });
        setPopType('query error');
        dispatch({ type: GlobalAction.setPopup, payload: true });
        setIsLoaded(true);
      });

    async function fillTasks2(array: [IOneTask]) {
      for (const item of array) {
        await fillTasksArray(boardId, item.id);
      }
    }

    if (data) {
      await fillTasks2(data);

      setTasksArray(arr);
      setColumnsArray(data);
      setIsLoaded(true);
    }
    setIsLoaded(true);
  };

  const fillTasksArray = async (boardId: string, columnId: string) => {
    const data = await getAllTasks(boardId, columnId)
      .then((response) => response.data)
      .catch((err: AxiosError) => {
        dispatch({ type: GlobalAction.setRespStatus, payload: err.response?.status });
        setPopType('query error');
        setTasksArray([{ columnId: '', content: [] }]);
        dispatch({ type: GlobalAction.setPopup, payload: true });
      });
    arr.push({ columnId: columnId, content: data ? data : [] });
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

  useEffect(() => {
    fillColumnsArray(boardId as string);
  }, []);

  useEffect(() => {
    if (isReload) {
      dispatch({ type: GlobalAction.setIsReload, payload: false });
      fillColumnsArray(boardId as string);
    }
  }, [isReload]);

  useEffect(() => {
    if (!isToken) {
      dispatch({ type: GlobalAction.setToken, payload: '' });
      setColumnsArray([]);
      setTasksArray([]);
      navigator(WELCOM_PAGE_URL);
    }
  }, [isToken]);

  const taskCreationHandler = (columnId: string) => {
    setPopType('task creating');
    dispatch({ type: GlobalAction.setIsPopupTaskCreation, payload: true });
    dispatch({ type: GlobalAction.setBoardId, payload: boardId });
    dispatch({ type: GlobalAction.setColumnId, payload: columnId });
    const tasks = tasksArray.find((item) => item.columnId === columnId)?.content;
    let order = 1;
    if (tasks && tasks.length) {
      const elem = tasks.reduce((prev, cur) => (prev.order > cur.order ? prev : cur));
      if (elem) {
        order = elem.order;
      }
    }
    dispatch({ type: GlobalAction.setOrderForCreation, payload: order ? order + 1 : 1 });
    dispatch({ type: GlobalAction.setCurrentNewObject, payload: 'task' });
  };

  const columnCreationHandler = () => {
    setPopType('task creating');
    dispatch({ type: GlobalAction.setIsPopupTaskCreation, payload: true });
    dispatch({ type: GlobalAction.setBoardId, payload: boardId });
    let order = 1;
    if (columnsArray.length) {
      const elem = columnsArray.reduce((prev, cur) => (prev.order > cur.order ? prev : cur));
      if (elem) {
        order = elem.order;
      }
    }
    dispatch({ type: GlobalAction.setOrderForCreation, payload: order ? order + 1 : 1 });
    dispatch({ type: GlobalAction.setCurrentNewObject, payload: 'column' });
  };

  const columnDeleteHandler = (columnId: string) => {
    setDeletedColumnId(columnId);
    dispatch({ type: GlobalAction.setIsPopupConfirm, payload: true });
  };

  return (
    <AppContext.Consumer>
      {(context): JSX.Element => (
        <>
          <LogInSection />
          <Header />
          <PopupSpot type={popType} />
          <Confirmation
            message={siteContent[context.locale].msgColumnDelete}
            boardId={boardId}
            columnId={deletedColumnId}
          />
          <main className="columns">
            <menu className="columns__menu">
              <button className="btn" onClick={() => columnCreationHandler()}>
                {siteContent[context.locale].btnCreateColumn}
              </button>
              <p className={`loading ${isLoaded ? 'elem-hidden' : ''}`}>
                {siteContent[context.locale].loading}
              </p>
            </menu>
            <div className="columns__scroll-wrapper">
              <div className="columns__container">
                {columnsArray.map((item: IColumn, index: number): JSX.Element => {
                  return (
                    <div className="columns__item" key={index}>
                      <div className="columns__item-content">
                        <div className="columns__header">
                          <h5 className="columns__item-header">{item.title}</h5>
                          <button
                            className="small-btn"
                            onClick={() => taskCreationHandler(item.id)}
                          >
                            {siteContent[context.locale].btnCreateTask}
                          </button>
                        </div>
                        <div className="task-container">
                          {(tasksArray as Array<ITasks>)
                            .find((tasksItem: ITasks) => tasksItem.columnId === item.id)
                            ?.content.map(
                              (taskItem: IOneTask, taskIndex: number): JSX.Element => (
                                <div key={taskIndex} className="task-item">
                                  <div className="task-item__title">{taskItem.title}</div>
                                  <div className="task-item__descr">{taskItem.description}</div>
                                </div>
                              )
                            )}
                        </div>
                        <div className="columns__footer">
                          <button
                            className="small-btn"
                            onClick={() => columnDeleteHandler(item.id)}
                          >
                            {siteContent[context.locale].btnDeleteColumn}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </main>
          <Footer />
        </>
      )}
    </AppContext.Consumer>
  );
}
