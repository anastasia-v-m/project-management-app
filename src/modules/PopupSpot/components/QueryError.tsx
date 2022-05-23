import React, { SyntheticEvent } from 'react';
import { GlobalAction } from '../../../store/reducers';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { getRespMessage } from '../../commonFunctions';

export default function QueryError(): JSX.Element {
  const { isPopup, respStatus } = useAppSelector((state) => state.reducer);
  const dispatch = useAppDispatch();

  const offPopup = () => {
    dispatch({ type: GlobalAction.setPopup, payload: false });
  };

  return (
    <div className={isPopup ? 'popup-wrapper active' : 'popup-wrapper'} onClick={offPopup}>
      <div
        className={isPopup ? 'popup-msg active' : 'popup-msg'}
        onClick={(e: SyntheticEvent) => {
          e.stopPropagation();
        }}
      >
        {getRespMessage(respStatus)}
      </div>
    </div>
  );
}
