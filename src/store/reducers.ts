import { AnyAction } from 'redux';

export interface IReducerState {
  headerBottom: number;
  token: string;
  loginType: number;
  respStatus: number;
  isPopup: boolean;
  isPopupNewBoard: boolean;
  isPopupConfirm: boolean;
  isPopupTaskCreation: boolean;
  lang: number;
  boardId: string;
  columnId: string;
  orderForCreation: number;
  currentNewObject: string;
  isReload: boolean;
  password: string;
  popupType: string;
}

const initialState = {
  headerBottom: 156, //40px высота кнопки + 8*2 марджины кнопки + 100px header
  token: '',
  loginType: 0,
  respStatus: 0,
  isPopup: false,
  isPopupNewBoard: false,
  isPopupConfirm: false,
  isPopupTaskCreation: false,
  lang: 0,
  boardId: '',
  columnId: '',
  orderForCreation: 0,
  currentNewObject: '',
  isReload: false,
  password: '',
  popupType: '',
};

export enum GlobalAction {
  setHeaderBottom = 'setHeaderBottom',
  setToken = 'setToken',
  setLoginType = 'setLoginType',
  setRespStatus = 'setRespStatus',
  setPopup = 'setPopup',
  setPopupNewBoard = 'setPopupNewBoard',
  setIsPopupConfirm = 'setIsPopupConfirm',
  setIsPopupTaskCreation = 'setIsPopupTaskCreation',
  setLang = 'setLang',
  setBoardId = 'setBoardId',
  setColumnId = 'setColumnId',
  setUserId = 'setUserId',
  setOrderForCreation = 'setOrderForCreation',
  setCurrentNewObject = 'setCurrentNewObject',
  setIsReload = 'setIsReload',
  setPassword = 'setPassword',
  setPopupType = 'setPopupType',
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
    case GlobalAction.setIsPopupTaskCreation:
      return {
        ...state,
        isPopupTaskCreation: payload,
      };
    case GlobalAction.setBoardId:
      return {
        ...state,
        boardId: payload,
      };
    case GlobalAction.setColumnId:
      return {
        ...state,
        columnId: payload,
      };
    case GlobalAction.setOrderForCreation:
      return {
        ...state,
        orderForCreation: payload,
      };
    case GlobalAction.setCurrentNewObject:
      return {
        ...state,
        currentNewObject: payload,
      };
    case GlobalAction.setIsReload:
      return {
        ...state,
        isReload: payload,
      };
    case GlobalAction.setPassword:
      return {
        ...state,
        password: payload,
      };
    case GlobalAction.setPopupType:
      return {
        ...state,
        popupType: payload,
      };
    default:
      return state;
  }
}
