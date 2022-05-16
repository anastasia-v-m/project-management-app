import React, { ReactElement, SyntheticEvent, useState } from 'react';

import { AppContext } from './AppContext';

interface IAppProvider {
  children: ReactElement;
}

const LANG_EN = 0;

function AppProvider(props: IAppProvider) {
  const [locale, setLocale] = useState(LANG_EN);

  const { children } = props;

  function setLocalIndex(e: SyntheticEvent) {
    const newLocale = (e.target as HTMLInputElement).checked ? 1 : 0;
    setLocale(newLocale);
  }

  return <AppContext.Provider value={{ locale, setLocalIndex }}>{children}</AppContext.Provider>;
}

export default AppProvider;
