import { USER_CONTACT_LIST } from "../Actions/FetchUser";

const initialState = {};

const ContactList = (state = initialState, action) => {
  switch (action.type) {
    case USER_CONTACT_LIST:
      return {
        ...state,
        data: action.payLoad,
      };
    default:
      return state;
  }
};

export default ContactList;
