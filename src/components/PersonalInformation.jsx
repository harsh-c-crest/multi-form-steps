import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { savePersonalInfo } from "../redux/actions/user";

// Validation schema using Yup
const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  middleName: Yup.string().required("Middle Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  gender: Yup.string().required("Gender is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
});

// React Component for Step1: Personal Information
const PersonalInformation = (props) => {
  const formState = useSelector((state) => state.form);
  const dispatch = useDispatch();

  // Personal Information Form Submit handler
  const handleSubmit = (values) => {
    console.log(values);
    dispatch(savePersonalInfo(values));
    props.handleNext();
  };

  const { firstName, middleName, lastName, gender, email } = formState;

  // Generate and return HTML for Step1: Personal Information
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <div className="step">
            <h4 className="text-center mt-4 mb-2">
              Step 1: Personal Information
            </h4>
            <Formik
              initialValues={{
                firstName: firstName || "",
                middleName: middleName || "",
                lastName: lastName || "",
                gender: gender || "",
                email: email || "",
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched }) => (
                <Form>
                  <div className="form-group mt-3">
                    <label htmlFor="firstName">First Name</label>
                    <Field
                      type="text"
                      name="firstName"
                      className={`form-control ${
                        errors.firstName && touched.firstName
                          ? "is-invalid"
                          : ""
                      }`}
                      required
                    />
                    <ErrorMessage
                      name="firstName"
                      component="span"
                      className="text-danger"
                    />
                  </div>
                  <div className="form-group mt-3">
                    <label>Middle Name</label>
                    <Field
                      type="text"
                      name="middleName"
                      className={`form-control ${
                        errors.middleName && touched.middleName
                          ? "is-invalid"
                          : ""
                      }`}
                      required
                    />
                    <ErrorMessage
                      name="middleName"
                      component="span"
                      className="text-danger"
                    />
                  </div>
                  <div className="form-group mt-3">
                    <label>Last Name</label>
                    <Field
                      type="text"
                      name="lastName"
                      className={`form-control ${
                        errors.lastName && touched.lastName ? "is-invalid" : ""
                      }`}
                      required
                    />
                    <ErrorMessage
                      name="lastName"
                      component="span"
                      className="text-danger"
                    />
                  </div>
                  <div className="form-group mt-3">
                    <label>Gender</label>
                  </div>
                  <div className="form-group d-flex gap-4 mt-1">
                    <label className="radio-inline">
                      <Field
                        type="radio"
                        name="gender"
                        value="male"
                        className="form-check-input"
                      />{" "}
                      Male
                    </label>
                    <label className="radio-inline">
                      <Field
                        type="radio"
                        name="gender"
                        value="female"
                        className="form-check-input"
                      />{" "}
                      Female
                    </label>
                    <label className="radio-inline">
                      <Field
                        type="radio"
                        name="gender"
                        value="other"
                        className="form-check-input"
                      />{" "}
                      Other
                    </label>
                    <ErrorMessage
                      name="gender"
                      component="span"
                      className="text-danger"
                    />
                  </div>
                  <div className="form-group mt-3">
                    <label>Email</label>
                    <Field
                      type="email"
                      name="email"
                      className={`form-control ${
                        errors.email && touched.email ? "is-invalid" : ""
                      }`}
                      required
                    />
                    <ErrorMessage
                      name="email"
                      component="span"
                      className="text-danger"
                    />
                  </div>
                  <div className="navigation text-center mt-4">
                    <button type="submit" className="btn btn-primary">
                      Next
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

export default PersonalInformation;
