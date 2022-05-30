import { AxiosError, AxiosResponse } from 'axios';
import React from 'react';
import { AppContext } from '../../components/AppContext';
import instance from '../../components/beNavigator';
import siteContent from '../../containers/content';
import { GlobalAction } from '../../store/reducers';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { getToken } from '../commonFunctions';
import './confirmation.scss';

export interface IConfirmation {
  message: string;
  boardId: string;
  columnId?: string;
}

export default function Confirmation(props: IConfirmation): JSX.Element {
  const { isPopupConfirm } = useAppSelector((state) => state.reducer);
  const token = getToken();
  const dispatch = useAppDispatch();

  const { message, boardId, columnId } = props;
  const offPopup = () => {
    dispatch({ type: GlobalAction.setIsPopupConfirm, payload: false });
  };

  const confirmAct = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const headers = { Authorization: `Bearer ${token}` };
    const DeleteBoard = (boardId: string): Promise<AxiosResponse> =>
      instance.delete(`/boards/${boardId}`, { headers });

    const DeleteColumn = (boardId: string, columnId: string): Promise<AxiosResponse> =>
      instance.delete(`/boards/${boardId}/columns/${columnId}`, { headers });
    let status;

    if (columnId) {
      status = await DeleteColumn(boardId, columnId)
        .then((response) => response.status)
        .catch((err: AxiosError) => {
          dispatch({ type: GlobalAction.setRespStatus, payload: err?.response?.status });
          offPopup();
          dispatch({ type: GlobalAction.setPopup, payload: true });
        });
    } else {
      status = await DeleteBoard(boardId)
        .then((response) => response.status)
        .catch((err: AxiosError) => {
          dispatch({ type: GlobalAction.setRespStatus, payload: err?.response?.status });
          offPopup();
          dispatch({ type: GlobalAction.setPopup, payload: true });
        });
    }
    if (status) {
      dispatch({ type: GlobalAction.setRespStatus, payload: 0 });
      if (status === 204) {
        dispatch({ type: GlobalAction.setIsReload, payload: true });
        offPopup();
      }
    }
  };

  const cancelAct = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    offPopup();
  };

  return (
    <AppContext.Consumer>
      {(context): JSX.Element => (
        <>
          <div className={isPopupConfirm ? 'popup-wrapper active' : 'popup-wrapper'}>
            <div className="comfirmation-wrapper">
              <p>{message}</p>
              <form>
                <button className="btn input-data__btn" type="button" onClick={confirmAct}>
                  {siteContent[context.locale].btnYes}
                </button>
                <br />
                <button className="btn input-data__btn" type="button" onClick={cancelAct}>
                  {siteContent[context.locale].btnNo}
                </button>
              </form>
            </div>
          </div>
        </>
      )}
    </AppContext.Consumer>
  );
}
