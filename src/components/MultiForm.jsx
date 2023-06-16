import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  savePersonalInfo,
  saveWillLocation,
  goToPreviousStep,
  goToNextStep,
} from "../redux/actions";

const MultiStepForm = () => {
  const dispatch = useDispatch();
  const formState = useSelector((state) => state.form);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(savePersonalInfo({ [name]: value }));
  };

  const handleWillLocationChange = (e) => {
    const { name, value } = e.target;
    dispatch(saveWillLocation({ [name]: value }));
  };

  const handlePrevious = () => {
    dispatch(goToPreviousStep());
  };

  const handleNext = () => {
    if (formState.currentStep == 1) {
      if (validateForm()) {
        dispatch(goToNextStep());
      }
    } else if (formState.currentStep == 2) {
      if (validateForm2()) {
        dispatch(goToNextStep());
      }
    }
  };

  const validateForm = () => {
    const { firstName, lastName, email, willLocation } = formState;
    const errors = {};

    if (!firstName || firstName.length < 2) {
      errors.firstName =
        "First name is required and must be at least 2 characters.";
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

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

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

  const renderStepOne = () => {
    const { firstName, middleName, lastName, gender, email } = formState;

    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className="step">
              <h2>Step 1: Personal Information</h2>
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={firstName || ""}
                  onChange={handleInputChange}
                  className="form-control"
                  required
                />
                {errors.firstName && (
                  <span className="text-danger">{errors.firstName}</span>
                )}
              </div>
              <div className="form-group">
                <label>Middle Name</label>
                <input
                  type="text"
                  name="middleName"
                  value={middleName || ""}
                  onChange={handleInputChange}
                  className="form-control"
                  required
                />
                {errors.middleName && (
                  <span className="text-danger">{errors.middleName}</span>
                )}
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={lastName || ""}
                  onChange={handleInputChange}
                  className="form-control"
                  required
                />
                {errors.lastName && (
                  <span className="text-danger">{errors.lastName}</span>
                )}
              </div>
              <div className="form-group">
                <label>Gender</label>
                <select
                  name="gender"
                  value={gender || ""}
                  onChange={handleInputChange}
                  className="form-control"
                  required
                >
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={email || ""}
                  onChange={handleInputChange}
                  className="form-control"
                  required
                />
                {errors.email && (
                  <span className="text-danger">{errors.email}</span>
                )}
              </div>
              <div className="navigation">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleNext}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

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
              <h2>Step 2: Original Will Location</h2>
              <div className="form-group">
                <label>Will stored at/with?</label>
                <div>
                  <label className="radio-inline">
                    <input
                      type="radio"
                      name="willLocation"
                      value="Home"
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
                      checked={willLocation === "Attorney"}
                      onChange={handleWillLocationChange}
                    />{" "}
                    Attorney
                  </label>
                </div>
              </div>
              <div className="form-group">
                <label>Address 1</label>
                <input
                  type="text"
                  name="address1"
                  value={address1 || ""}
                  onChange={handleInputChange}
                  className="form-control"
                />
                {errors.address1 && (
                  <span className="text-danger">{errors.address1}</span>
                )}
              </div>
              <div className="form-group">
                <label>Address 2</label>
                <input
                  type="text"
                  name="address2"
                  value={address2 || ""}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label>City</label>
                <input
                  type="text"
                  name="city"
                  value={city || ""}
                  onChange={handleInputChange}
                  className="form-control"
                />
                {errors.city && (
                  <span className="text-danger">{errors.city}</span>
                )}
              </div>
              <div className="form-group">
                <label>Zipcode</label>
                <input
                  type="text"
                  name="zipcode"
                  value={zipcode || ""}
                  onChange={handleInputChange}
                  className="form-control"
                />
                {errors.zipcode && (
                  <span className="text-danger">{errors.zipcode}</span>
                )}
              </div>
              <div className="form-group">
                <label>State</label>
                <input
                  type="text"
                  name="state"
                  value={state || ""}
                  onChange={handleInputChange}
                  className="form-control"
                />
                {errors.state && (
                  <span className="text-danger">{errors.state}</span>
                )}
              </div>
              {willLocation === "Home" && (
                <div className="form-group">
                  <label>Where in Home?</label>
                  <textarea
                    name="whereInHome"
                    value={whereInHome || ""}
                    onChange={handleInputChange}
                    className="form-control"
                  ></textarea>
                  {errors.whereInHome && (
                    <span className="text-danger">{errors.whereInHome}</span>
                  )}
                </div>
              )}
              {willLocation === "Attorney" && (
                <>
                  <div className="form-group">
                    <label>Attorney's First Name</label>
                    <input
                      type="text"
                      name="attorneyFirstName"
                      value={attorneyFirstName || ""}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                    {errors.attorneyFirstName && (
                      <span className="text-danger">
                        {errors.attorneyFirstName}
                      </span>
                    )}
                  </div>
                  <div className="form-group">
                    <label>Attorney's Last Name</label>
                    <input
                      type="text"
                      name="attorneyLastName"
                      value={attorneyLastName || ""}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                    {errors.attorneyLastName && (
                      <span className="text-danger">
                        {errors.attorneyLastName}
                      </span>
                    )}
                  </div>
                  <div className="form-group">
                    <label>Attorney Firm Name</label>
                    <input
                      type="text"
                      name="attorneyFirmName"
                      value={attorneyFirmName || ""}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                    {errors.attorneyFirmName && (
                      <span className="text-danger">
                        {errors.attorneyFirmName}
                      </span>
                    )}
                  </div>
                  <div className="form-group">
                    <label>Attorney Email</label>
                    <input
                      type="email"
                      name="attorneyEmail"
                      value={attorneyEmail || ""}
                      onChange={handleInputChange}
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
              <div className="navigation">
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
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="multi-step-form">
      {formState.currentStep === 1 && renderStepOne()}
      {formState.currentStep === 2 && renderStepTwo()}
    </div>
  );
};

export default MultiStepForm;
