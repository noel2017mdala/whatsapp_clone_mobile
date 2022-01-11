export const DeactivateNavHeader = () => {
  return async (dispatch) => {
    dispatch({ type: "DEACTIVATE_HEADER" });
  };
};

export const ActivateHeader = () => {
  return async (dispatch) => {
    dispatch({ type: "ACTIVATE_HEADER" });
  };
};
