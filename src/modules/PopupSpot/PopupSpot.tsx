import React from 'react';
import NewCreation from './components/NewCreation';
import NewBoard from './components/NewBoard';
import QueryError from './components/QueryError';

import './popupSpot.scss';

export default function PopupSpot(props: { type: string }): JSX.Element {
  const { type } = props;
  let variableFragment: JSX.Element;
  if (type === 'query error') {
    variableFragment = <QueryError />;
  } else if (type === 'board creating') {
    variableFragment = <NewBoard />;
  } else if (type === 'task creating') {
    variableFragment = <NewCreation />;
  } else {
    variableFragment = <div />;
  }
  return variableFragment;
}
