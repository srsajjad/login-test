import React, { useContext } from "react";
import { Formik } from "formik";
import { Form, TextInput, Button } from "carbon-components-react";
import { useHistory } from "react-router-dom";
import { ArrowRight32 } from "@carbon/icons-react";
import { LoginContext } from "context/LoginContext";

export const Email = (props) => {
  const history = useHistory();
  const {
    state: { email },
    dispatch,
  } = useContext(LoginContext);

  const validateEmail = ({ email }) => {
    let errors = {};

    // here we can add custom email validation logic / use some lib
    if (!email) errors.email = "Required";
    else if (!email.includes("@")) errors.email = "Invalid Email";

    return errors;
  };

  const submissionHandler = (values, { setSubmitting }) => {
    dispatch({ type: "UPDATE_EMAIL", payload: { email: values.email } });

    // go to password route
    history.push("/login/password");
  };

  return (
    <div className="email">
      <Formik
        initialValues={{ email: email || "" }}
        validate={validateEmail}
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
                id="email"
                name="email"
                className="form-input"
                labelText="Enter Your Strobes Id"
                // helperText="Email"
                placeholder="john.doe@example.com"
                value={values.email}
                invalidText={errors.email}
                invalid={Boolean(touched.email && errors.email)}
              />
            </div>

            <Button className="submit" type="submit">
              Continue <ArrowRight32 />
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
