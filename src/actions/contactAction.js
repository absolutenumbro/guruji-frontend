import axios from "axios";

// Create Contact
export const createContact = (contactData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post("/api/v1/contact", contactData, config);

    dispatch({
      type: "CREATE_CONTACT_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "CREATE_CONTACT_FAIL",
      payload: error.response.data.message,
    });
  }
};

// Get All Contacts (Admin)
export const getAllContacts = () => async (dispatch) => {
  try {
    const { data } = await axios.get("/api/v1/admin/contacts");

    dispatch({
      type: "ALL_CONTACTS_SUCCESS",
      payload: data.contacts,
    });
  } catch (error) {
    dispatch({
      type: "ALL_CONTACTS_FAIL",
      payload: error.response.data.message,
    });
  }
};

// Clear Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: "CLEAR_ERRORS",
  });
}; 