const contactReducer = (state = { contacts: [] }, action) => {
  switch (action.type) {
    case "CREATE_CONTACT_SUCCESS":
      return {
        ...state,
        success: true,
      };
    case "CREATE_CONTACT_FAIL":
      return {
        ...state,
        error: action.payload,
      };
    case "ALL_CONTACTS_SUCCESS":
      return {
        ...state,
        contacts: action.payload,
      };
    case "ALL_CONTACTS_FAIL":
      return {
        ...state,
        error: action.payload,
      };
    case "CLEAR_ERRORS":
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export default contactReducer; 