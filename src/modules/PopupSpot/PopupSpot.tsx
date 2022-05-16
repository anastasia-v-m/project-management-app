import React, { SyntheticEvent } from 'react';
import { GlobalAction } from '../../store/reducers';
import { useAppDispatch, useAppSelector } from '../../store/store';
import statusDescription, { COMMON_ERROE } from '../statusDescription';
import './popupSpot.scss';

export default function PopupSpot(): JSX.Element {
  const { respStatus, isPopup } = useAppSelector((state) => state.reducer);
  const dispatch = useAppDispatch();

  const offPopup = () => {
    dispatch({ type: GlobalAction.setPopup, payload: false });
  };

  const getRespMessage = (): string => {
    const result = statusDescription.find((item) => item.status === respStatus);
    return result?.message || COMMON_ERROE;
  };

  return (
    <div className={isPopup ? 'popup-wrapper active' : 'popup-wrapper'} onClick={offPopup}>
      <div
        className={isPopup ? 'popup-msg active' : 'popup-msg'}
        onClick={(e: SyntheticEvent) => {
          e.stopPropagation();
        }}
      >
        {getRespMessage()}
      </div>
    </div>
  );
}
