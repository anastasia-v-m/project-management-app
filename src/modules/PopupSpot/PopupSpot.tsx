import React, { SyntheticEvent } from 'react';
import { AppContext } from '../../components/AppContext';
import siteContent from '../../containers/content';
import { GlobalAction } from '../../store/reducers';
import { useAppDispatch, useAppSelector } from '../../store/store';
import NewBoard from './components/NewBoard';
import QueryError from './components/QueryError';

import './popupSpot.scss';

export default function PopupSpot(props: { type: string }): JSX.Element {
  const { respStatus, isPopup } = useAppSelector((state) => state.reducer);
  const dispatch = useAppDispatch();

  const offPopup = () => {
    dispatch({ type: GlobalAction.setPopup, payload: false });
  };

  const { type } = props;
  let variableFragment: JSX.Element;
  if (type === 'query error') {
    variableFragment = <QueryError />;
  } else if (type === 'board creating') {
    variableFragment = <NewBoard popupVisibility={true} />;
  } else {
    variableFragment = <div />;
  }
  return variableFragment;
}
