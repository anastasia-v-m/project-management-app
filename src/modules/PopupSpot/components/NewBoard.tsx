import React, { SyntheticEvent, useState } from 'react';
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

export default function NewBoard(props: { popupVisibility: boolean }): JSX.Element {
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const CreateBoard = (data: ICreateBoard): Promise<any> =>
      instance.post('/boards', data, { headers });
    setTitleIsValid((refTitle.current?.value as string).trim() !== '');
    if (titleIsValid) {
      const requestData = {
        title: (refTitle.current?.value as string).trim(),
        description: (refDescr.current?.value as string).trim(),
      };
      try {
        const { status } = await CreateBoard(requestData).then((response) => response);
        if (status === 201) {
          offPopup();
          alert('ok');
        }
      } catch (err) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        dispatch({ type: GlobalAction.setRespStatus, payload: err.response.status });
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
          <form onSubmit={boardCreatingSubmitHandler} onClick={ignorePopup}>
            <label className={`input-data__title`} htmlFor="boardtitle">
              {siteContent[context.locale].boardTitleInputTitle}
              <input type="text" name="boardtitle" className="input-data__box" ref={refTitle} />
              <p className="input-data__error-message">
                {titleIsValid ? '' : siteContent[context.locale].incorrectBoardTitleMsg}
              </p>
            </label>
            <label className="input-data__title" htmlFor="login">
              {siteContent[context.locale].boardDescrInputTitle}
              <input
                type="text"
                name="login"
                maxLength={100}
                className="input-data__box"
                ref={refDescr}
              />
            </label>
            <button className="btn input-data__btn" type="submit">
              OK
            </button>
            <div>{getRespMessage(respStatus)}</div>
          </form>
        </div>
      )}
    </AppContext.Consumer>
  );
}
