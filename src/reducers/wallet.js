import { REQUEST_API, RESPONSE_API, EXPENSES_DATA } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

export default function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case REQUEST_API:
    return { ...state };
  case RESPONSE_API:
    return {
      ...state,
      currencies: action.payload,
    };
  case EXPENSES_DATA:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  default:
    return state;
  }
}

// EXPENSES o case retorna o que já havia no estado, e um array com as antigas despesas e a nosa (ele não substitui);

// const wallet = (state = INITIAL_STATE, action) => {
//   switch (action.type) {
//   default:
//     return state;
//   }
// };

// export default wallet;
