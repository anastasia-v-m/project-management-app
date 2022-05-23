import React, { SyntheticEvent, useState } from 'react';
import { AppContext } from '../../components/AppContext';
import instance from '../../components/beNavigator';
import siteContent from '../../containers/content';
import { GlobalAction } from '../../store/reducers';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { getRespMessage, getToken } from '../commonFunctions';
import './confirmation.scss';

export interface IConfirmation {
  message: string;
  boardId: string;
}

const refTitle: React.RefObject<HTMLInputElement> = React.createRef();
const refDescr: React.RefObject<HTMLInputElement> = React.createRef();

export default function NewBoard(props: IConfirmation): JSX.Element {
  const { isPopupConfirm } = useAppSelector((state) => state.reducer);
  const token = getToken();
  const dispatch = useAppDispatch();

  const { message, boardId } = props;
  const offPopup = () => {
    dispatch({ type: GlobalAction.setIsPopupConfirm, payload: false });
  };

  const confirmAct = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const headers = { Authorization: `Bearer ${token}` };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const DeleteBoard = (boardId: string): Promise<any> =>
      instance.delete(`/boards/${boardId}`, { headers });
    try {
      console.log(headers);
      const { status } = await DeleteBoard(boardId).then((response) => response);
      if (status === 201) {
        offPopup();
        alert('ok');
      }
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      dispatch({ type: GlobalAction.setRespStatus, payload: err.response.status });
    }
  };

  const cancelAct = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    offPopup();
  };

  const ignorePopup = (e: SyntheticEvent) => {
    e.stopPropagation();
  };

  return (
    <AppContext.Consumer>
      {(context): JSX.Element => (
        <div className={isPopupConfirm ? 'popup-wrapper active' : 'popup-wrapper'}>
          <form>
            <div>{message}</div>
            <button className="btn input-data__btn" type="button" onClick={confirmAct}>
              {siteContent[context.locale].btnYes}
            </button>

            <button className="btn input-data__btn" type="button" onClick={cancelAct}>
              {siteContent[context.locale].btnNo}
            </button>
          </form>
        </div>
      )}
    </AppContext.Consumer>
  );
}
