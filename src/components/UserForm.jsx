import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  goToPreviousStep,
  goToNextStep,
  resetForm,
} from "../redux/actions/user";
import SuccessPopup from "./SuccessMessage";
import PersonalInformation from "./PersonalInformation";
import OriginalWill from "./OriginalWill";

// React component to render user details in multi step form
const UserForm = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const dispatch = useDispatch();
  const formState = useSelector((state) => state.form);
  const [errors, setErrors] = useState({});
  const handlePrevious = () => {
    dispatch(goToPreviousStep());
  };

  const handleClose = () => {
    // Close the success pop-up
    setShowSuccess(false);
    dispatch(resetForm());
  };

  const handleNext = () => {
    if (formState.currentStep == 1) {
      dispatch(goToNextStep());
    } else if (formState.currentStep == 2) {
      setShowSuccess(true);
    }
  };

  // Render HTML for the multi step form
  return (
    <div className="multi-step-form">
      {formState.currentStep === 1 && (
        <PersonalInformation errors={errors} handleNext={handleNext} />
      )}
      {formState.currentStep === 2 && (
        <OriginalWill
          errors={errors}
          handleNext={handleNext}
          handlePrevious={handlePrevious}
        />
      )}
      {showSuccess && (
        <div className="modal-backdrop">
          {" "}
          <SuccessPopup handleClose={handleClose} />
        </div>
      )}
    </div>
  );
};

export default UserForm;
