import { AxiosError, AxiosResponse } from 'axios';
import React, { SyntheticEvent, useState } from 'react';
import { AppContext } from '../../../components/AppContext';
import instance from '../../../components/beNavigator';
import siteContent from '../../../containers/content';
import { GlobalAction } from '../../../store/reducers';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { getRespMessage, getToken, jwtDecoder } from '../../commonFunctions';

export interface ICreateTask {
  title: string;
  done: boolean;
  order: number;
  description: string;
  userId: string;
}

export interface ICreateColumn {
  title: string;
  order: number;
}

export interface IResponseAxCreation {
  config: never;
  data: ICreateColumn | ICreateTask;
  headers: never;
  status: number;
  statusText: string;
}

const refTitle: React.RefObject<HTMLInputElement> = React.createRef();
const refDescr: React.RefObject<HTMLInputElement> = React.createRef();

export default function NewCreation(): JSX.Element {
  const [titleIsValid, setTitleIsValid] = useState(true);

  const { isPopupTaskCreation, boardId, columnId, respStatus, currentNewObject, orderForCreation } =
    useAppSelector((state) => state.reducer);
  const token = getToken();

  const dispatch = useAppDispatch();
  const offPopup = () => {
    dispatch({ type: GlobalAction.setIsPopupTaskCreation, payload: false });
    dispatch({ type: GlobalAction.setRespStatus, payload: 0 });
  };

  const ignorePopup = (e: SyntheticEvent) => {
    e.stopPropagation();
  };

  const objCreatingSubmitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (currentNewObject === 'task') {
      taskCreatiionFunc();
    } else if (currentNewObject === 'column') {
      columnCreatiionFunc();
    }
  };

  const taskCreatiionFunc = async () => {
    const { userId } = jwtDecoder(token);
    const headers = { Authorization: `Bearer ${token}` };
    const CreateTask = (data: ICreateTask): Promise<AxiosResponse> =>
      instance.post(`/boards/${boardId}/columns/${columnId}/tasks`, data, { headers });
    setTitleIsValid((refTitle.current?.value as string).trim().length > 1);
    if (titleIsValid) {
      const requestData = {
        title: (refTitle.current?.value as string).trim(),
        done: false,
        order: orderForCreation,
        description: (refDescr.current?.value as string).trim(),
        userId,
      };
      const status = await CreateTask(requestData)
        .then((response) => response.status)
        .catch((err: AxiosError) =>
          dispatch({ type: GlobalAction.setRespStatus, payload: err?.response?.status })
        );
      if (status) {
        if (status === 201) {
          dispatch({ type: GlobalAction.setIsReload, payload: true });
          offPopup();
        }
      }
    }
  };

  const columnCreatiionFunc = async () => {
    const headers = { Authorization: `Bearer ${token}` };
    const CreateColumn = (data: ICreateColumn): Promise<AxiosResponse> =>
      instance.post(`/boards/${boardId}/columns`, data, { headers });
    setTitleIsValid((refTitle.current?.value as string).trim().length > 1);
    if (titleIsValid) {
      const requestData = {
        title: (refTitle.current?.value as string).trim(),
        order: orderForCreation,
      };
      const status = await CreateColumn(requestData)
        .then((response) => response.status)
        .catch((err: AxiosError) =>
          dispatch({ type: GlobalAction.setRespStatus, payload: err?.response?.status })
        );
      if (status) {
        if (status === 201) {
          dispatch({ type: GlobalAction.setIsReload, payload: true });
          offPopup();
        }
      }
    }
  };

  return (
    <AppContext.Consumer>
      {(context): JSX.Element => (
        <div
          className={isPopupTaskCreation ? 'popup-wrapper active' : 'popup-wrapper'}
          onClick={offPopup}
        >
          <form onSubmit={objCreatingSubmitHandler} onClick={ignorePopup}>
            <label className="input-data__title" htmlFor="creationtitle">
              {siteContent[context.locale].taskTitleInputTitle}
              <input type="text" name="creationtitle" className="input-data__box" ref={refTitle} />
              <p className="input-data__error-message">
                {!titleIsValid ? siteContent[context.locale].incorrectLengthMsg : ''}
              </p>
            </label>
            <label
              className={`input-data__title ${currentNewObject === 'column' ? 'elem-hidden' : ''}`}
              htmlFor="creationdescr"
            >
              {siteContent[context.locale].taskDescrInputTitle}
              <input type="text" name="creationdescr" className="input-data__box" ref={refDescr} />
            </label>
            <button className="btn input-data__btn" type="submit">
              OK
            </button>
            <p className="input-data__error-message">
              {getRespMessage(respStatus)[context.locale]}
            </p>
          </form>
        </div>
      )}
    </AppContext.Consumer>
  );
}
