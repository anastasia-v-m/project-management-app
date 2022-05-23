import { AnyAction } from 'redux';

export interface IReducerState {
  headerBottom: number;
  token: string;
  loginType: number;
  respStatus: number;
  isPopup: boolean;
  isPopupNewBoard: boolean;
  isPopupConfirm: boolean;
  lang: number;
}

const initialState = {
  headerBottom: 156, //40px высота кнопки + 8*2 марджины кнопки + 100px header
  token: '',
  loginType: 0,
  respStatus: 0,
  isPopup: false,
  isPopupNewBoard: false,
  isPopupConfirm: false,
  lang: 0,
};

export enum GlobalAction {
  setHeaderBottom = 'setHeaderBottom',
  setToken = 'setToken',
  setLoginType = 'setLoginType',
  setRespStatus = 'setRespStatus',
  setPopup = 'setPopup',
  setPopupNewBoard = 'setPopupNewBoard',
  setIsPopupConfirm = 'setIsPopupConfirm',
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
    case GlobalAction.setToken:
      return {
        ...state,
        token: payload,
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
    case GlobalAction.setPopupNewBoard:
      return {
        ...state,
        isPopupNewBoard: payload,
      };
    case GlobalAction.setIsPopupConfirm:
      return {
        ...state,
        isPopupConfirm: payload,
      };
    default:
      return state;
  }
}
