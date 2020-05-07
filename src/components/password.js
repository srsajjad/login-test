import React, { useState, useContext } from "react";
import { Formik } from "formik";
import {
  Form,
  TextInput,
  Button,
  InlineLoading,
} from "carbon-components-react";
import { ArrowLeft32, ArrowRight32 } from "@carbon/icons-react";
import { useHistory } from "react-router-dom";
import { delay } from "utils/api";
import { LoginContext } from "context/LoginContext";

export const Password = (props) => {
  // hooks
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const {
    state: { email, password },
    dispatch,
  } = useContext(LoginContext);

  // handler functions
  const validatePassword = ({ password }) => {
    let errors = {};

    // here we can add custom password validation logic / use some lib
    if (!password) errors.passsword = "Required";
    else if (password.length < 6) errors.password = "Invalid Password";

    return errors;
  };

  const submissionHandler = (values, { setSubmitting }) => {
    dispatch({
      type: "UPDATE_PASSWORD",
      payload: { password: values.password },
    });

    setLoading(true);

    // fake API call - might leak memory
    // ideally we'd use Thunk / Saga

    delay(200).then(() => {
      setLoading(false);

      // go to verify route
      history.push("/login/verify");
    });
  };

  // return
  return (
    <div className="password">
      <div
        style={{ cursor: "pointer" }}
        tabIndex={0}
        onClick={() => history.push("/login/email")}
      >
        <ArrowLeft32 /> <span className="go-back-email">{email}</span>
      </div>

      <Formik
        initialValues={{ password: password || "" }}
        validate={validatePassword}
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
              <TextInput.PasswordInput
                id="password"
                name="password"
                labelText="Enter Your Password"
                helperText="Password"
                placeholder="******"
                value={values.password}
                invalidText={errors.password}
                invalid={Boolean(touched.password && errors.password)}
                showPasswordLabel="Show password"
              />
            </div>

            <Button
              style={{ display: "flex", justifyContent: "space-between" }}
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <InlineLoading status="active" description="Loading..." />
              ) : (
                <span>
                  Continue <ArrowRight32 />
                </span>
              )}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
