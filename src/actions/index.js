import getApiData from '../services/getApi';

export const LOGIN_EMAIL = 'LOGIN_EMAIL';
export const REQUEST_API = 'REQUEST_API';
export const RESPONSE_API = 'RESPONSE_API';
export const EXPENSES_DATA = 'EXPENSES_DATA';

export const loginEmail = (payload) => ({
  type: LOGIN_EMAIL,
  payload,
});
export const requestApi = (payload) => ({
  type: REQUEST_API,
  payload,
});
export const responseApi = (payload) => ({
  type: RESPONSE_API,
  payload,
});
export const expensesData = (payload) => ({
  type: EXPENSES_DATA,
  payload,
});

export const fecthApi = () => (dispatch) => {
  dispatch(requestApi());
  getApiData().then((data) => {
    dispatch(responseApi(data));
  });
};
