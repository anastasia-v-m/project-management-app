import { createContext, SyntheticEvent } from 'react';

interface IAppContextType {
  locale: number;
  setLocalIndex: (e: SyntheticEvent) => void;
}

export const AppContext = createContext({} as IAppContextType);
