import { useDispatch, useSelector } from "react-redux";
import { saveWillLocation } from "../redux/actions/user";

// React Component for Step2: Original Will Location
const OriginalWill = (props) => {
  const dispatch = useDispatch();
  const formState = useSelector((state) => state.form);

  
  const handleWillLocationChange = (e) => {
    const { name, value } = e.target;
    dispatch(saveWillLocation({ [name]: value }));
  }

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

   // Generate and return HTML for Step2: Original Will Location
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
                {props.errors.whereInHome && (
                  <span className="text-danger">{props.errors.whereInHome}</span>
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
                  {props.errors.attorneyFirstName && (
                    <span className="text-danger">
                      {props.errors.attorneyFirstName}
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
                  {props.errors.attorneyLastName && (
                    <span className="text-danger">
                      {props.errors.attorneyLastName}
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
                  {props.errors.attorneyFirmName && (
                    <span className="text-danger">
                      {props.errors.attorneyFirmName}
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
                  {props.errors.attorneyEmail && (
                    <span className="text-danger">{props.errors.attorneyEmail}</span>
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
              {props.errors.address1 && (
                <span className="text-danger">{props.errors.address1}</span>
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
              {props.errors.city && (
                <span className="text-danger">{props.errors.city}</span>
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
              {props.errors.zipcode && (
                <span className="text-danger">{props.errors.zipcode}</span>
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
              {props.errors.state && (
                <span className="text-danger">{props.errors.state}</span>
              )}
            </div>

            <div className="navigation text-center mt-4 d-flex justify-content-center gap-3 mb-4">
              <button
                type="button"
                className="btn btn-primary"
                onClick={props.handlePrevious}
              >
                Previous
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={props.handleNext}
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

export default OriginalWill;
