const updateUserReducer = (state = false, action) => {
    switch (action.type) {
      case "UPDATE_USER":
        return !state;
      default:
        return state;
    }
  };
  
  export default updateUserReducer;
  