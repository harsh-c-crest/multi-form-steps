// Reducer for managing user data in store

import { combineReducers } from "redux";

const initialState = {
  currentStep: 1,
  firstName: "",
  middleName: "",
  lastName: "",
  gender: "",
  email: "",
  willLocation: "",
  address1: "",
  address2: "",
  city: "",
  zipcode: "",
  state: "",
  whereInHome: "",
  attorneyFirstName: "",
  attorneyLastName: "",
  attorneyFirmName: "",
  attorneyEmail: "",
};

const formReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SAVE_PERSONAL_INFO":
      return {
        ...state,
        ...action.payload,
      };
    case "SAVE_WILL_LOCATION":
      return {
        ...state,
        ...action.payload,
      };
    case "GO_TO_PREVIOUS_STEP":
      return {
        ...state,
        currentStep: state.currentStep - 1,
      };
    case "GO_TO_NEXT_STEP":
      return {
        ...state,
        currentStep: state.currentStep + 1,
      };
    case "RESET_FORM":
      return {
        currentStep: 1,
        ...initialState,
      };
    default:
      return state;
  }
};

const reducer = combineReducers({
  //form reducer to store form data
  form: formReducer,
});

export default reducer;
