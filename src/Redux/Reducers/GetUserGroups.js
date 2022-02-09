import { USER_GROUPS } from "../Actions/GroupsAction";

const initialState = {};

export const UserGroupsData = (state = initialState, action) => {
  switch (action.type) {
    case USER_GROUPS:
      return {
        ...state,
        data: action.payLoad,
      };
    default:
      return state;
  }
};
