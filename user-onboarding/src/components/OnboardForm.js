import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

const OnboardForm = ({ values, errors, touched, status }) => {
  const [users, setUser] = useState([]);
  useEffect(() => {
    if (status) {
      setUser([...users, status]);
    }
  }, [status]);

  return (
    <div className="user-form">
      <Form>
        <Field type="text" name="name" placeholder="Name" />
        {touched.name && errors.name && <p className="error">{errors.name}</p>}

        <Field type="text" name="email" placeholder="email" />
        {touched.email && errors.email && (
          <p className="error">{errors.email}</p>
        )}
        <Field type="password" name="password" placeholder="password" />
        {touched.password && errors.password && (
          <p className="error">{errors.password}</p>
        )}
        <label>
          ToS
          <Field type="checkbox" name="ToS" checked={values.ToS} />
        </label>
        <button>Submit!</button>
      </Form>
      {users.map(user => (
        <ul key={user.id}>
          <li>Name: {user.name}</li>
          <li>Email: {user.email}</li>
          <li>Password: {user.password}</li>
          <li>Accepted ToS: {user.ToS.toString()}</li>
        </ul>
      ))}
    </div>
  );
};
const FormikUserForm = withFormik({
  mapPropsToValues({ name, email, password, ToS }) {
    return {
      name: name || "",
      email: email || "",
      password: password || "",
      ToS: ToS || false
    };
  },
  validationSchema: Yup.object().shape({
    name: Yup.string().required(),
    email: Yup.string().required(),
    password: Yup.string().required()
  }),
  //You can use this to see the values
  handleSubmit(values, { setStatus }) {
    axios
      .post("https://reqres.in/api/users/", values)
      .then(res => {
        setStatus(res.data);
      })
      .catch(err => console.log(err.res));
  }
})(OnboardForm);
console.log("This is the HOC", FormikUserForm);
export default FormikUserForm;
