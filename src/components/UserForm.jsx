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
;

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
      if (validateForm()) {
        dispatch(goToNextStep());
      }
    } else if (formState.currentStep == 2) {
      if (validateForm2()) {
        // dispatch(goToNextStep());
        setShowSuccess(true);
      }
    }
  };

  // Function to validate fields for Step1: Personal Information
  const validateForm = () => {
    const { firstName, middleName, lastName, email, willLocation } = formState;
    const errors = {};

    if (!firstName || firstName.length < 2) {
      errors.firstName =
        "First name is required and must be at least 2 characters.";
    }

    if (!middleName || middleName.length < 2) {
      errors.middleName =
        "Middle name is required and must be at least 2 characters.";
    }

    if (!lastName || lastName.length < 2) {
      errors.lastName =
        "Last name is required and must be at least 2 characters.";
    }

    if (!email) {
      errors.email = "Email is required.";
    } else if (!isValidEmail(email)) {
      errors.email = "Invalid email format.";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Function to validate Email
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Function to validate fields for Step2:Original Will Location
  const validateForm2 = () => {
    const { willLocation } = formState;
    const errors = {};

    if (!formState.address1) {
      errors.address1 = "Address is required.";
    }

    if (!formState.city) {
      errors.city = "City is required";
    }

    if (!formState.zipcode) {
      errors.zipcode = "Zipcode is required";
    }

    if (!formState.state) {
      errors.state = "State is required";
    }

    if (willLocation === "Home") {
      if (!formState.whereInHome) {
        errors.whereInHome =
          "Please specify where in the home the will is located.";
      }
    } else if (willLocation === "Attorney") {
      if (
        !formState.attorneyFirstName ||
        formState.attorneyFirstName.length < 2
      ) {
        errors.attorneyFirstName =
          "Attorney first name is required and must be at least 2 characters.";
      }

      if (
        !formState.attorneyLastName ||
        formState.attorneyLastName.length < 2
      ) {
        errors.attorneyLastName =
          "Attorney last name is required and must be at least 2 characters.";
      }

      if (!formState.attorneyFirmName) {
        errors.attorneyFirmName = "Attorney firm name is required.";
      }

      if (!formState.attorneyEmail) {
        errors.attorneyEmail = "Attorney email is required.";
      } else if (!isValidEmail(formState.attorneyEmail)) {
        errors.attorneyEmail = "Invalid attorney email format.";
      }
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
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
      {showSuccess && <div className="modal-backdrop"> <SuccessPopup handleClose={handleClose} /></div>}
    </div>
  );
};

export default UserForm;
