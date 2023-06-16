// Reducer for managing user data in store

const initialState = {
  form: {
    currentStep: 1,
    firstName: '',
    middleName: '',
    lastName: '',
    gender: '',
    email: '',
    willLocation: '',
    address1: '',
    address2: '',
    city: '',
    zipcode: '',
    state: '',
    whereInHome: '',
    attorneyFirstName: '',
    attorneyLastName: '',
    attorneyFirmName: '',
    attorneyEmail: '',
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SAVE_PERSONAL_INFO':
      return {
        ...state,
        form: {
          ...state.form,
          ...action.payload,
        },
      };
    case 'SAVE_WILL_LOCATION':
      return {
        ...state,
        form: {
          ...state.form,
          ...action.payload,
        },
      };
    case 'GO_TO_PREVIOUS_STEP':
      return {
        ...state,
        form: {
          ...state.form,
          currentStep: state.form.currentStep - 1,
        },
      };
    case 'GO_TO_NEXT_STEP':
      return {
        ...state,
        form: {
          ...state.form,
          currentStep: state.form.currentStep + 1,
        },
      };
    case 'RESET_FORM':
      return {
        form: {
          currentStep: 1
        },
      };
    default:
      return state;
  }
};


export default reducer;
