import { AxiosError, AxiosResponse } from 'axios';
import React, { SyntheticEvent, useState } from 'react';
import PopupSpot from '..';
import { AppContext } from '../../../components/AppContext';
import instance from '../../../components/beNavigator';
import siteContent from '../../../containers/content';
import { GlobalAction } from '../../../store/reducers';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { getRespMessage, getToken } from '../../commonFunctions';

export interface ICreateBoard {
  title: string;
  description: string;
}

const refTitle: React.RefObject<HTMLInputElement> = React.createRef();
const refDescr: React.RefObject<HTMLInputElement> = React.createRef();

export default function NewBoard(): JSX.Element {
  const [titleIsValid, setTitleIsValid] = useState(true);

  const { respStatus, isPopupNewBoard } = useAppSelector((state) => state.reducer);
  const token = getToken();
  const dispatch = useAppDispatch();

  const offPopup = () => {
    dispatch({ type: GlobalAction.setPopupNewBoard, payload: false });
  };

  const boardCreatingSubmitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const headers = { Authorization: `Bearer ${token}` };
    const CreateBoard = (data: ICreateBoard): Promise<AxiosResponse> =>
      instance.post('/boards', data, { headers });
    setTitleIsValid((refTitle.current?.value as string).trim() !== '');
    if (titleIsValid) {
      const requestData = {
        title: (refTitle.current?.value as string).trim(),
        description: (refDescr.current?.value as string).trim(),
      };
      const status = await CreateBoard(requestData)
        .then((response) => response.status)
        .catch((err: AxiosError) => {
          dispatch({ type: GlobalAction.setRespStatus, payload: err?.response?.status });
          dispatch({ type: GlobalAction.setPopup, payload: true });
        });
      if (status) {
        if (status === 201) {
          dispatch({ type: GlobalAction.setIsReload, payload: true });
          offPopup();
        }
      }
    }
  };

  const ignorePopup = (e: SyntheticEvent) => {
    e.stopPropagation();
  };

  return (
    <AppContext.Consumer>
      {(context): JSX.Element => (
        <div
          className={isPopupNewBoard ? 'popup-wrapper active' : 'popup-wrapper'}
          onClick={offPopup}
        >
          <PopupSpot type="query error" />
          <form onSubmit={boardCreatingSubmitHandler} onClick={ignorePopup}>
            <label className={`input-data__title`} htmlFor="boardtitle">
              {siteContent[context.locale].boardTitleInputTitle}
              <input type="text" name="boardtitle" className="input-data__box" ref={refTitle} />
              <p className="input-data__error-message">
                {titleIsValid ? '' : siteContent[context.locale].incorrectBoardTitleMsg}
              </p>
            </label>
            <label className="input-data__title" htmlFor="descr">
              {siteContent[context.locale].boardDescrInputTitle}
              <input
                type="text"
                name="descr"
                maxLength={100}
                className="input-data__box"
                ref={refDescr}
              />
            </label>
            <button className="btn input-data__btn" type="submit">
              OK
            </button>
            <div>{getRespMessage(respStatus)[context.locale]}</div>
          </form>
        </div>
      )}
    </AppContext.Consumer>
  );
}
