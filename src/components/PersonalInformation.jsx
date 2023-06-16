import { useDispatch, useSelector } from "react-redux";
import { savePersonalInfo } from "../redux/actions";

const PersonalInformation = (props) => {
  const dispatch = useDispatch();
  const formState = useSelector((state) => state.form);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(savePersonalInfo({ [name]: value }));
  };

  const { firstName, middleName, lastName, gender, email } = formState;

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <div className="step">
            <h4 className="text-center mt-4 mb-2">
              Step 1: Personal Information
            </h4>
            <div className="form-group mt-3">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                name="firstName"
                value={firstName || ""}
                onChange={handleInputChange}
                className="form-control"
                required
              />
              {props.errors.firstName && (
                <span className="text-danger">{props.errors.firstName}</span>
              )}
            </div>
            <div className="form-group mt-3">
              <label>Middle Name</label>
              <input
                type="text"
                name="middleName"
                value={middleName || ""}
                onChange={handleInputChange}
                className="form-control"
                required
              />
              {props.errors.middleName && (
                <span className="text-danger">{props.errors.middleName}</span>
              )}
            </div>
            <div className="form-group mt-3">
              <label>Last Name</label>
              <input
                type="text"
                name="lastName"
                value={lastName || ""}
                onChange={handleInputChange}
                className="form-control"
                required
              />
              {props.errors.lastName && (
                <span className="text-danger">{props.errors.lastName}</span>
              )}
            </div>
            <div className="form-group mt-3">
              <label>Gender</label>
            </div>
            <div className="form-group d-flex gap-4 mt-1">
              <label className="radio-inline">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  className="form-check-input"
                  checked={gender === "male"}
                  onChange={handleInputChange}
                />{" "}
                Male
              </label>
              <label className="radio-inline">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  className="form-check-input"
                  checked={gender === "female"}
                  onChange={handleInputChange}
                />{" "}
                Female
              </label>
              <label className="radio-inline">
                <input
                  type="radio"
                  name="gender"
                  value="other"
                  className="form-check-input"
                  checked={gender === "other"}
                  onChange={handleInputChange}
                />{" "}
                Other
              </label>
            </div>
            <div className="form-group mt-3">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={email || ""}
                onChange={handleInputChange}
                className="form-control"
                required
              />
              {props.errors.email && (
                <span className="text-danger">{props.errors.email}</span>
              )}
            </div>
            <div className="navigation text-center mt-4">
              <button
                type="button"
                className="btn btn-primary"
                onClick={props.handleNext}
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

export default PersonalInformation;
