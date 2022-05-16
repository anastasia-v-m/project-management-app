import { AnyAction } from 'redux';

export interface IReducerState {
  headerBottom: number;
  isToken: boolean;
  loginType: number;
  respStatus: number;
  isPopup: boolean;
  lang: number;
}

const initialState = {
  headerBottom: 156, //40px высота кнопки + 8*2 марджины кнопки + 100px header
  isToken: false,
  loginType: 0,
  respStatus: 0,
  isPopup: false,
  lang: 0,
};

export enum GlobalAction {
  setHeaderBottom = 'setHeaderBottom',
  setIsToken = 'setIsToken',
  setLoginType = 'setLoginType',
  setRespStatus = 'setRespStatus',
  setPopup = 'setPopup',
  setLang = 'setLang',
}

export function reducer(state = initialState, action: AnyAction): IReducerState {
  const { type, payload } = action;
  switch (type) {
    case GlobalAction.setHeaderBottom:
      return {
        ...state,
        headerBottom: payload,
      };
    case GlobalAction.setIsToken:
      return {
        ...state,
        isToken: payload,
      };
    case GlobalAction.setLoginType:
      return {
        ...state,
        loginType: payload,
      };
    case GlobalAction.setRespStatus:
      return {
        ...state,
        respStatus: payload,
      };
    case GlobalAction.setPopup:
      return {
        ...state,
        isPopup: payload,
      };
    case GlobalAction.setPopup:
      return {
        ...state,
        lang: payload,
      };
    default:
      return state;
  }
}
