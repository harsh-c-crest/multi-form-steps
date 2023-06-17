import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { saveWillLocation } from "../redux/actions/user";

// React Component for Step2: Original Will Location
const OriginalWill = (props) => {
  const dispatch = useDispatch();
  const formState = useSelector((state) => state.form);

  const handleChange = (e) => {
    console.log(e.target.value);
    dispatch(saveWillLocation({ [e.target.name]: e.target.value }));
  };

  // Validation schema using Yup
  const validationSchema = Yup.object().shape({
    willLocation: Yup.string().required("Will location is required"),
    whereInHome:
      formState.willLocation === "Home"
        ? Yup.string().required("Where in home is required")
        : Yup.string(),
    attorneyFirstName:
      formState.willLocation === "Attorney"
        ? Yup.string().required("Attorney's first name is required")
        : Yup.string(),
    attorneyLastName:
      formState.willLocation === "Attorney"
        ? Yup.string().required("Attorney's last name is required")
        : Yup.string(),
    attorneyFirmName:
      formState.willLocation === "Attorney"
        ? Yup.string().required("Attorney firm name is required")
        : Yup.string(),
    attorneyEmail:
      formState.willLocation === "Attorney"
        ? Yup.string()
            .email("Invalid email address")
            .required("Attorney email is required")
        : Yup.string(),
    address1: Yup.string().required("Address line 1 is required"),
    address2: Yup.string(),
    city: Yup.string().required("City is required"),
    zipcode: Yup.string().required("Zipcode is required"),
    state: Yup.string().required("State is required"),
  });

  // Original Will Location Form Submit handler
  const handleSubmit = (values) => {
    console.log(values);
    dispatch(saveWillLocation(values));
    props.handleNext();
  };

  // Generate and return HTML for Step2: Original Will Location
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <div className="step">
            <h4 className="text-center mt-4 mb-2">
              Step 2: Original Will Location
            </h4>

            <Formik
              initialValues={formState}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
              enableReinitialize={true}
            >
              {({ errors, touched }) => (
                <Form>
                  {/* Will stored at/with? */}
                  <div className="form-group mt-3">
                    <label>Will stored at/with?</label>
                    <div className="d-flex gap-4 mt-1">
                      <label className="radio-inline">
                        <Field
                          type="radio"
                          name="willLocation"
                          value="Home"
                          className="form-check-input"
                          checked={formState.willLocation === "Home"}
                          onChange={handleChange}
                        />{" "}
                        Home
                      </label>
                      <label className="radio-inline">
                        <Field
                          type="radio"
                          name="willLocation"
                          value="Attorney"
                          className="form-check-input"
                          checked={formState.willLocation === "Attorney"}
                          onChange={handleChange}
                        />{" "}
                        Attorney
                      </label>
                    </div>
                    <ErrorMessage
                      name="willLocation"
                      component="div"
                      className="text-danger"
                    />
                  </div>

                  {/* Where in Home? */}
                  {formState.willLocation === "Home" && (
                    <div className="form-group mt-3">
                      <label>Where in Home?</label>
                      <Field
                        as="textarea"
                        name="whereInHome"
                        className={`form-control ${
                          touched.whereInHome && errors.whereInHome
                            ? "is-invalid"
                            : ""
                        }`}
                        value={formState.whereInHome || ""}
                        onChange={handleChange}
                        validateOnChange={false}
                      />
                      <ErrorMessage
                        name="whereInHome"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                  )}

                  {formState.willLocation === "Attorney" && (
                    <div>
                      <div className="form-group mt-3">
                        <label>Attorney's First Name</label>
                        <Field
                          type="text"
                          name="attorneyFirstName"
                          className={`form-control ${
                            touched.attorneyFirstName &&
                            errors.attorneyFirstName
                              ? "is-invalid"
                              : ""
                          }`}
                          value={formState.attorneyFirstName || ""}
                          onChange={handleChange}
                          validateOnChange={false}
                        />
                        <ErrorMessage
                          name="attorneyFirstName"
                          component="div"
                          className="text-danger"
                        />
                      </div>

                      <div className="form-group mt-3">
                        <label>Attorney's Last Name</label>
                        <Field
                          type="text"
                          name="attorneyLastName"
                          className={`form-control ${
                            touched.attorneyLastName && errors.attorneyLastName
                              ? "is-invalid"
                              : ""
                          }`}
                          value={formState.attorneyLastName || ""}
                          onChange={handleChange}
                          validateOnChange={false}
                        />
                        <ErrorMessage
                          name="attorneyLastName"
                          component="div"
                          className="text-danger"
                        />
                      </div>

                      <div className="form-group mt-3">
                        <label>Attorney Firm Name</label>
                        <Field
                          type="text"
                          name="attorneyFirmName"
                          className={`form-control ${
                            touched.attorneyFirmName && errors.attorneyFirmName
                              ? "is-invalid"
                              : ""
                          }`}
                          value={formState.attorneyFirmName || ""}
                          onChange={handleChange}
                          validateOnChange={false}
                        />
                        <ErrorMessage
                          name="attorneyFirmName"
                          component="div"
                          className="text-danger"
                        />
                      </div>

                      <div className="form-group mt-3">
                        <label>Attorney Email</label>
                        <Field
                          type="email"
                          name="attorneyEmail"
                          className={`form-control ${
                            touched.attorneyEmail && errors.attorneyEmail
                              ? "is-invalid"
                              : ""
                          }`}
                          value={formState.attorneyEmail || ""}
                          onChange={handleChange}
                          validateOnChange={false}
                        />
                        <ErrorMessage
                          name="attorneyEmail"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                    </div>
                  )}

                  {/* Address Line 1 */}
                  <div className="form-group mt-3">
                    <label>Address Line 1</label>
                    <Field
                      type="text"
                      name="address1"
                      className={`form-control ${
                        touched.address1 && errors.address1 ? "is-invalid" : ""
                      }`}
                      value={formState.address1}
                      onChange={handleChange}
                      validateOnChange={false}
                    />
                    <ErrorMessage
                      name="address1"
                      component="div"
                      className="text-danger"
                    />
                  </div>

                  {/* Address Line 2 */}
                  <div className="form-group mt-3">
                    <label>Address Line 2</label>
                    <Field
                      type="text"
                      name="address2"
                      className="form-control"
                      value={formState.address2}
                      onChange={handleChange}
                      validateOnChange={false}
                    />
                  </div>

                  {/* City */}
                  <div className="form-group mt-3">
                    <label>City</label>
                    <Field
                      type="text"
                      name="city"
                      className={`form-control ${
                        touched.city && errors.city ? "is-invalid" : ""
                      }`}
                      value={formState.city || ""}
                      onChange={handleChange}
                      validateOnChange={false}
                    />
                    <ErrorMessage
                      name="city"
                      component="div"
                      className="text-danger"
                    />
                  </div>

                  {/* Zipcode */}
                  <div className="form-group mt-3">
                    <label>Zipcode</label>
                    <Field
                      type="text"
                      name="zipcode"
                      className={`form-control ${
                        touched.zipcode && errors.zipcode ? "is-invalid" : ""
                      }`}
                      value={formState.zipcode || ""}
                      onChange={handleChange}
                      validateOnChange={false}
                    />
                    <ErrorMessage
                      name="zipcode"
                      component="div"
                      className="text-danger"
                    />
                  </div>

                  {/* State */}
                  <div className="form-group mt-3">
                    <label>State</label>
                    <Field
                      type="text"
                      name="state"
                      className={`form-control ${
                        touched.state && errors.state ? "is-invalid" : ""
                      }`}
                      value={formState.state || ""}
                      onChange={handleChange}
                      validateOnChange={false}
                    />
                    <ErrorMessage
                      name="state"
                      component="div"
                      className="text-danger"
                    />
                  </div>

                  {/* Navigation Buttons */}
                  <div className="navigation text-center mt-4 d-flex justify-content-center gap-3 mb-4">
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={props.handlePrevious}
                    >
                      Previous
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Submit
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OriginalWill;
