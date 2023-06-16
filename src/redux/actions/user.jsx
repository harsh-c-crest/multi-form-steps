// Dispatch actions for user data

export const savePersonalInfo = (personalInfo) => {
  return {
    type: 'SAVE_PERSONAL_INFO',
    payload: personalInfo,
  };
};

export const saveWillLocation = (willLocation) => {
  return {
    type: 'SAVE_WILL_LOCATION',
    payload: willLocation,
  };
};

export const goToPreviousStep = () => {
  return {
    type: 'GO_TO_PREVIOUS_STEP',
  };
};

export const goToNextStep = () => {
  return {
    type: 'GO_TO_NEXT_STEP',
  };
};

export const resetForm = () => {
  return {
    type: 'RESET_FORM',
  };
};
