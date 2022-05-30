import React, { ReactElement, SyntheticEvent, useState } from 'react';

import { AppContext } from './AppContext';

interface IAppProvider {
  children: ReactElement;
}

const CUR_LANG = localStorage.getItem('lang');
const LANG_EN = 0;

function AppProvider(props: IAppProvider) {
  const [locale, setLocale] = useState(CUR_LANG ? Number(CUR_LANG) : LANG_EN);

  const { children } = props;

  function setLocalIndex(e: SyntheticEvent) {
    const newLocale = (e.target as HTMLInputElement).checked ? 1 : 0;
    setLocale(newLocale);
    localStorage.setItem('lang', newLocale.toString());
  }

  return <AppContext.Provider value={{ locale, setLocalIndex }}>{children}</AppContext.Provider>;
}

export default AppProvider;
