import { CUSTOMER_SIGNUP } from "../actions/types";

const initialState = {
  user: {},
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case CUSTOMER_SIGNUP:
      return {
        ...state,
        user: action.payload,
      };
    // case OWNER_SIGNUP:
    //     return {
    //         ...state,
    //         user: action.payload
    //     };
    default:
      return state;
  }
}