const NavHeader = (state = true, action) => {
  switch (action.type) {
    case "DEACTIVATE_HEADER":
      return (state = false);
    case "ACTIVATE_HEADER":
      return (state = true);
    default:
      return state;
  }
};

export default NavHeader;
