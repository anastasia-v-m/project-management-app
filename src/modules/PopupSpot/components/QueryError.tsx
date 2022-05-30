import React, { SyntheticEvent, useEffect, useState } from 'react';
import { AppContext } from '../../../components/AppContext';
import { GlobalAction } from '../../../store/reducers';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { getRespMessage } from '../../commonFunctions';

export default function QueryError(): JSX.Element {
  const { isPopup, respStatus } = useAppSelector((state) => state.reducer);
  const dispatch = useAppDispatch();
  const [curRespStatus, setCurRespStatus] = useState(respStatus);

  const offPopup = () => {
    dispatch({ type: GlobalAction.setPopup, payload: false });
    dispatch({ type: GlobalAction.setRespStatus, payload: 0 });
  };

  useEffect(() => {
    setCurRespStatus(respStatus);
  }, [isPopup]);

  return (
    <AppContext.Consumer>
      {(context): JSX.Element => (
        <div className={isPopup ? 'popup-wrapper active' : 'popup-wrapper'} onClick={offPopup}>
          <div
            className={isPopup ? 'popup-msg active' : 'popup-msg'}
            onClick={(e: SyntheticEvent) => {
              e.stopPropagation();
            }}
          >
            {getRespMessage(curRespStatus)[context.locale]}
          </div>
        </div>
      )}
    </AppContext.Consumer>
  );
}
