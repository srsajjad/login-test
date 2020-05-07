import React, { useState, useContext } from "react";
import { Formik } from "formik";
import {
  Form,
  TextInput,
  Button,
  InlineLoading,
  ToastNotification,
} from "carbon-components-react";
import { ArrowRight32 } from "@carbon/icons-react";
import { useHistory } from "react-router-dom";
import { delay } from "utils/api";
import { LoginContext } from "context/LoginContext";

export const Veriy = (props) => {
  // hooks
  const [loading, setLoading] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const history = useHistory();
  const { state, dispatch } = useContext(LoginContext);

  console.log("state", state);

  const { verificationCode, email, password } = state;

  // handler functions
  const validateCode = ({ verificationCode }) => {
    let errors = {};

    // here we can add custom verification validation logic
    if (!verificationCode) errors.verificationCode = "Required";
    else if (verificationCode.length < 4)
      errors.verificationCode = "Invalid Code";

    return errors;
  };

  const submissionHandler = (values) => {
    dispatch({
      type: "UPDATE_VERIFICATION_CODE",
      payload: { verificationCode: values.verificationCode },
    });

    setLoading(true);

    // fake API call - might leak memory
    // ideally we'd use Thunk / Saga

    delay(200).then((tId) => {
      if (email === "admin@xyz" && password === "password") {
        // ideally we save token (JWT) here
        localStorage.setItem("email", email);
        localStorage.setItem("password", password);

        // dispatch({ type: "RE_RUN", payload: {} });
        history.push("/");
      } else setShowNotification(true);

      // go to password route
      setLoading(false);

      // clean up
      clearTimeout(tId);
    });
  };

  return (
    <div className="verification-code">
      <Formik
        initialValues={{
          verificationCode: verificationCode,
        }}
        validate={validateCode}
        onSubmit={submissionHandler}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <Form
            onSubmit={handleSubmit}
            onChange={handleChange}
            onBlur={handleBlur}
          >
            <div style={{ marginBottom: "2em" }}>
              <TextInput
                id="verificationCode"
                name="verificationCode"
                className="form-input"
                labelText="2 Step Verification"
                helperText="Google Authentication Code"
                placeholder="****"
                value={values.verificationCode}
                invalidText={errors.verificationCode}
                invalid={Boolean(
                  touched.verificationCode && errors.verificationCode
                )}
              />
            </div>

            <Button
              style={{ display: "flex", justifyContent: "space-between" }}
              type="submit"
              disabled={loading}
              className="submit"
            >
              {loading ? (
                <InlineLoading status="active" description="Loading..." />
              ) : (
                <span>
                  Continue <ArrowRight32 />
                </span>
              )}
            </Button>

            <ToastNotification
              style={{
                opacity: showNotification ? 1 : 0,
                transition: "opacity 0.2s",
              }}
              kind="error"
              title="Incorrect Code"
              subtitle={<a href="/login/email">Retry</a>}
              timeout={0}
              caption="Login Failed"
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};
