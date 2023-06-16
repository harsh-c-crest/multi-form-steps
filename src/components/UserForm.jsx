import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  saveWillLocation,
  goToPreviousStep,
  goToNextStep,
  resetForm,
} from "../redux/actions/user";
import SuccessPopup from "./SuccessMessage";
import PersonalInformation from "./PersonalInformation";

// React component to render user details in multi step form
const UserForm = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const dispatch = useDispatch();
  const formState = useSelector((state) => state.form);
  const [errors, setErrors] = useState({});

  const handleWillLocationChange = (e) => {
    const { name, value } = e.target;
    dispatch(saveWillLocation({ [name]: value }));
  };

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

  // Function to generate and return HTML for Step2:Original Will Location
  const renderStepTwo = () => {
    const {
      willLocation,
      address1,
      address2,
      city,
      zipcode,
      state,
      whereInHome,
      attorneyFirstName,
      attorneyLastName,
      attorneyFirmName,
      attorneyEmail,
    } = formState;

    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className="step">
              <h4 className="text-center mt-4 mb-2">
                Step 2: Original Will Location
              </h4>
              <div className="form-group mt-3">
                <label>Will stored at/with?</label>
                <div className="d-flex gap-4 mt-1">
                  <label className="radio-inline">
                    <input
                      type="radio"
                      name="willLocation"
                      value="Home"
                      className="form-check-input"
                      checked={willLocation === "Home"}
                      onChange={handleWillLocationChange}
                    />{" "}
                    Home
                  </label>
                  <label className="radio-inline">
                    <input
                      type="radio"
                      name="willLocation"
                      value="Attorney"
                      className="form-check-input"
                      checked={willLocation === "Attorney"}
                      onChange={handleWillLocationChange}
                    />{" "}
                    Attorney
                  </label>
                </div>
              </div>
              {willLocation === "Home" && (
                <div className="form-group mt-3">
                  <label>Where in Home?</label>
                  <textarea
                    name="whereInHome"
                    value={whereInHome || ""}
                    onChange={handleWillLocationChange}
                    className="form-control"
                  ></textarea>
                  {errors.whereInHome && (
                    <span className="text-danger">{errors.whereInHome}</span>
                  )}
                </div>
              )}
              {willLocation === "Attorney" && (
                <>
                  <div className="form-group mt-3">
                    <label>Attorney's First Name</label>
                    <input
                      type="text"
                      name="attorneyFirstName"
                      value={attorneyFirstName || ""}
                      onChange={handleWillLocationChange}
                      className="form-control"
                    />
                    {errors.attorneyFirstName && (
                      <span className="text-danger">
                        {errors.attorneyFirstName}
                      </span>
                    )}
                  </div>
                  <div className="form-group mt-3">
                    <label>Attorney's Last Name</label>
                    <input
                      type="text"
                      name="attorneyLastName"
                      value={attorneyLastName || ""}
                      onChange={handleWillLocationChange}
                      className="form-control"
                    />
                    {errors.attorneyLastName && (
                      <span className="text-danger">
                        {errors.attorneyLastName}
                      </span>
                    )}
                  </div>
                  <div className="form-group mt-3">
                    <label>Attorney Firm Name</label>
                    <input
                      type="text"
                      name="attorneyFirmName"
                      value={attorneyFirmName || ""}
                      onChange={handleWillLocationChange}
                      className="form-control"
                    />
                    {errors.attorneyFirmName && (
                      <span className="text-danger">
                        {errors.attorneyFirmName}
                      </span>
                    )}
                  </div>
                  <div className="form-group mt-3">
                    <label>Attorney Email</label>
                    <input
                      type="email"
                      name="attorneyEmail"
                      value={attorneyEmail || ""}
                      onChange={handleWillLocationChange}
                      className="form-control"
                    />
                    {errors.attorneyEmail && (
                      <span className="text-danger">
                        {errors.attorneyEmail}
                      </span>
                    )}
                  </div>
                </>
              )}
              <div className="form-group mt-3">
                <label>Address Line 1</label>
                <input
                  type="text"
                  name="address1"
                  value={address1 || ""}
                  onChange={handleWillLocationChange}
                  className="form-control"
                />
                {errors.address1 && (
                  <span className="text-danger">{errors.address1}</span>
                )}
              </div>
              <div className="form-group mt-3">
                <label>Address Line 2</label>
                <input
                  type="text"
                  name="address2"
                  value={address2 || ""}
                  onChange={handleWillLocationChange}
                  className="form-control"
                />
              </div>
              <div className="form-group mt-3">
                <label>City</label>
                <input
                  type="text"
                  name="city"
                  value={city || ""}
                  onChange={handleWillLocationChange}
                  className="form-control"
                />
                {errors.city && (
                  <span className="text-danger">{errors.city}</span>
                )}
              </div>
              <div className="form-group mt-3">
                <label>Zipcode</label>
                <input
                  type="text"
                  name="zipcode"
                  value={zipcode || ""}
                  onChange={handleWillLocationChange}
                  className="form-control"
                />
                {errors.zipcode && (
                  <span className="text-danger">{errors.zipcode}</span>
                )}
              </div>
              <div className="form-group mt-3">
                <label>State</label>
                <input
                  type="text"
                  name="state"
                  value={state || ""}
                  onChange={handleWillLocationChange}
                  className="form-control"
                />
                {errors.state && (
                  <span className="text-danger">{errors.state}</span>
                )}
              </div>

              <div className="navigation text-center mt-4 d-flex justify-content-center gap-3 mb-4">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handlePrevious}
                >
                  Previous
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleNext}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Render HTML for the multi step form
  return (
    <div className="multi-step-form">
      {formState.currentStep === 1 && (
        <PersonalInformation errors={errors} handleNext={handleNext} />
      )}
      {formState.currentStep === 2 && renderStepTwo()}
      {showSuccess && <SuccessPopup handleClose={handleClose} />}
    </div>
  );
};

export default UserForm;
