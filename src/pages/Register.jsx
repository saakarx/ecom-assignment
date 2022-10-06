import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import bcrypt from 'bcryptjs';
import { useNavigate } from 'react-router-dom';

import { createUser, userExists } from '../utils/firebase';
import Header from '../components/Header';
import Navbar from '../components/Navbar';

function Register() {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const hashPassword = async password => {
    return await bcrypt.hash(password, 10);
  };

  const handleSubmit = async values => {
    try {
      const user = await userExists(values.email);
      if (user) {
        // clear the fields
        values.name = '';
        values.email = '';
        values.password = '';
        values.confirmPassword = '';
        throw new Error('User already exists');
      }

      const hashedPass = await hashPassword(values.password);
      const newUser = {
        name: values.name,
        email: values.email,
        password: hashedPass
      };
      createUser(newUser);
      // clear the fields
      values.name = '';
      values.email = '';
      values.password = '';
      values.confirmPassword = '';

      navigate('/login');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <Navbar />
      <Header heading="Register" />
      {error && <p className="error">{error}</p>}
      <Formik
        initialValues={{
          name: '',
          email: '',
          password: '',
          confirmPassword: ''
        }}
        validationSchema={Yup.object({
          name: Yup.string().required('Name is required'),
          email: Yup.string()
            .email('Must be a valid email address')
            .required('Required'),
          password: Yup.string().required('Password is required'),
          confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Required')
        })}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="input-control">
            <label htmlFor="name">Name</label>
            <Field name="name" type="text" placeholder="Name" />
            <p>
              <ErrorMessage name="name" />
            </p>
          </div>

          <div className="input-control">
            <label htmlFor="email">Email</label>
            <Field name="email" type="email" placeholder="Email Address" />
            <p>
              <ErrorMessage name="email" />
            </p>
          </div>

          <div className="input-control">
            <label htmlFor="password">Password</label>
            <Field name="password" type="password" placeholder="Password" />
            <p>
              <ErrorMessage name="password" />
            </p>
          </div>

          <div className="input-control">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <Field
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
            />
            <p>
              <ErrorMessage name="confirmPassword" />
            </p>
          </div>

          <button className="submit-btn" type="submit">
            Register
          </button>
        </Form>
      </Formik>
    </>
  );
}

export default Register;
